import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { HubApi } from "./hub-api.js";
import { DEFAULT_RUNTIME_IMAGE } from "./runtime-image.js";

const execFileAsync = promisify(execFile);

export async function pushTemplateToSpace(params: {
  targetRepo: string;
  token: string;
  sourceDir?: string;
  runtimeImage?: string;
}): Promise<{ templateRev: string }> {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "hclaw-space-"));
  try {
    const sourceDir = params.sourceDir ?? process.env.HCLAW_SOURCE_DIR ?? await findPackagedSourceRoot();
    const templateRev = await currentTemplateRev(sourceDir);
    const outDir = path.join(tempRoot, "space");
    await fs.mkdir(outDir, { recursive: true });
    await generateSpaceRepo(sourceDir, outDir, {
      ...(params.runtimeImage ? { runtimeImage: params.runtimeImage } : {}),
    });

    const hub = new HubApi({ token: params.token });
    const [files, existingFiles] = await Promise.all([
      readFilesForCommit(outDir),
      hub.listSpaceFiles(params.targetRepo).catch(() => []),
    ]);
    const nextPaths = new Set(files.map((file) => file.path));
    const deletePaths = existingFiles.filter((file) => !nextPaths.has(file));
    await hub.commitSpaceFiles(params.targetRepo, {
      files,
      deletePaths,
      title: `Deploy Hugging Claw ${templateRev.slice(0, 12)}`,
    });
    return { templateRev };
  } finally {
    await fs.rm(tempRoot, { recursive: true, force: true });
  }
}

export async function currentTemplateRev(sourceDir?: string): Promise<string> {
  sourceDir ??= process.env.HCLAW_SOURCE_DIR ?? await findPackagedSourceRoot();
  try {
    const { stdout } = await execFileAsync("git", ["-C", sourceDir, "rev-parse", "HEAD"]);
    const rev = stdout.trim();
    if (rev) {
      return rev;
    }
  } catch {
    // npm installs and no-git launcher environments fall back to package metadata.
  }
  const pkg = JSON.parse(await fs.readFile(path.join(sourceDir, "package.json"), "utf8")) as {
    name?: string;
    version?: string;
  };
  return `npm:${pkg.name ?? "huggingclaw"}@${pkg.version ?? "unknown"}`;
}

export async function generateSpaceRepo(
  sourceDir: string,
  outDir: string,
  options: { runtimeImage?: string } = {},
): Promise<void> {
  const copies: Array<[string, string]> = [
    [".gitattributes", ".gitattributes"],
    ["assets/huggingclaw.svg", "assets/huggingclaw.svg"],
    ["space/README.md", "README.md"],
  ];
  for (const [from, to] of copies) {
    await copyExisting(path.join(sourceDir, from), path.join(outDir, to));
  }
  await fs.writeFile(
    path.join(outDir, "Dockerfile"),
    `FROM ${options.runtimeImage ?? DEFAULT_RUNTIME_IMAGE}\n`,
    "utf8",
  );
}

async function findPackagedSourceRoot(): Promise<string> {
  const start = path.dirname(fileURLToPath(import.meta.url));
  let dir = start;
  while (true) {
    if (await hasPackagedSourceFiles(dir)) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error("Could not find packaged Hugging Claw source files. Reinstall the huggingclaw npm package.");
    }
    dir = parent;
  }
}

async function hasPackagedSourceFiles(dir: string): Promise<boolean> {
  const required = [
    "package.json",
    "Dockerfile",
    "entrypoint.sh",
    "space/README.md",
    "src/hf-state-sync/cli.ts",
    "src/hf-bucket-client/client.ts",
  ];
  try {
    await Promise.all(required.map((file) => fs.access(path.join(dir, file))));
    return true;
  } catch {
    return false;
  }
}

async function copyExisting(from: string, to: string): Promise<void> {
  const stat = await fs.stat(from);
  await fs.mkdir(path.dirname(to), { recursive: true });
  if (stat.isDirectory()) {
    await fs.cp(from, to, { recursive: true });
  } else {
    await fs.copyFile(from, to);
    await fs.chmod(to, stat.mode);
  }
}

async function readFilesForCommit(root: string): Promise<Array<{ path: string; content: Buffer }>> {
  const files: Array<{ path: string; content: Buffer }> = [];
  for (const relativePath of await listFiles(root)) {
    files.push({
      path: relativePath,
      content: await fs.readFile(path.join(root, relativePath)),
    });
  }
  return files;
}

async function listFiles(root: string, dir = ""): Promise<string[]> {
  const absoluteDir = path.join(root, dir);
  const entries = await fs.readdir(absoluteDir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const relativePath = path.posix.join(dir.split(path.sep).join(path.posix.sep), entry.name);
    const absolutePath = path.join(root, relativePath);
    if (entry.isDirectory()) {
      files.push(...await listFiles(root, relativePath));
    } else if (entry.isFile()) {
      files.push(relativePath);
    } else {
      const stat = await fs.stat(absolutePath);
      if (stat.isFile()) {
        files.push(relativePath);
      }
    }
  }
  return files.sort();
}
