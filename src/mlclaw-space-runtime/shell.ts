import type { RuntimeBranding } from "./branding.js";

const SHELL_MARKER = "data-mlclaw-shell";
const BRANDING_MARKER = "data-mlclaw-branding";

export function shouldInjectShell(params: {
  method: string | undefined;
  requestAccept: string | undefined;
  responseContentType: string | undefined;
  responseContentEncoding?: string | undefined;
}): boolean {
  const method = params.method ?? "GET";
  return (method === "GET" || method === "HEAD") &&
    (params.requestAccept ?? "").includes("text/html") &&
    (params.responseContentType ?? "").toLowerCase().includes("text/html") &&
    !params.responseContentEncoding;
}

export function rewriteOpenClawHtml(html: string, branding: RuntimeBranding): string {
  return injectMlClawShell(injectBranding(html, branding), branding);
}

export function injectMlClawShell(html: string, branding: RuntimeBranding): string {
  const shell = `
<div ${SHELL_MARKER} style="position:fixed;left:max(16px,env(safe-area-inset-left));bottom:max(16px,env(safe-area-inset-bottom));z-index:2147483647;">
  <a href="/mlclaw" aria-label="Open ${escapeHtml(branding.name)} settings" title="${escapeHtml(branding.name)}" style="box-sizing:border-box;display:flex;width:44px;height:44px;aspect-ratio:1/1;align-items:center;justify-content:center;border:1px solid rgba(15,23,42,.14);border-radius:8px;background:rgba(255,255,255,.96);box-shadow:0 10px 24px rgba(15,23,42,.16);text-decoration:none;">
    <img src="/assets/hf-logo.svg" alt="" width="28" height="28" style="display:block;width:28px;height:28px;object-fit:contain;">
  </a>
</div>
`;
  if (html.includes(SHELL_MARKER)) {
    return html;
  }
  if (html.includes("</body>")) {
    return html.replace("</body>", `${shell}</body>`);
  }
  return `${html}${shell}`;
}

function injectBranding(html: string, branding: RuntimeBranding): string {
  const title = `${escapeHtml(branding.name)} Control`;
  let out = html;
  if (/<title>[\s\S]*?<\/title>/i.test(out)) {
    out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  } else if (/<head[^>]*>/i.test(out)) {
    out = out.replace(/<head([^>]*)>/i, `<head$1>\n<title>${title}</title>`);
  }
  const meta = `
<meta ${BRANDING_MARKER} name="application-name" content="${escapeHtml(branding.name)}">
<meta ${BRANDING_MARKER} name="apple-mobile-web-app-title" content="${escapeHtml(branding.shortName)}">
<meta ${BRANDING_MARKER} name="theme-color" content="${escapeHtml(branding.themeColor)}">
`;
  if (!out.includes(BRANDING_MARKER) && out.includes("</head>")) {
    out = out.replace("</head>", `${meta}</head>`);
  }
  return out;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}
