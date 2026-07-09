#!/usr/bin/env node
import { seedHuggingFaceTooling } from "./seed.js";

try {
  const result = await seedHuggingFaceTooling();
  const copied = result.copiedSkills.length;
  const skipped = result.skippedSkills.length;
  const workspaceCopied = result.copiedWorkspaceSkills.length;
  const workspaceSkipped = result.skippedWorkspaceSkills.length;
  const templates = result.copiedTemplateFiles.length;
  const context = result.wroteContextFile ? "updated" : "current";
  const manifest = result.wroteManifest ? "updated" : "current";
  console.log(
    `[hf-tooling] workspace=${result.workspaceDir} agentsSkills=copied:${copied},skipped:${skipped} workspaceSkills=copied:${workspaceCopied},skipped:${workspaceSkipped} templates:${templates} context:${context} manifest:${manifest}`,
  );
} catch (err) {
  console.error(`[hf-tooling] ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
}
