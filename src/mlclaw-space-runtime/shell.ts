const SHELL_MARKER = "data-mlclaw-shell";

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

export function injectMlClawShell(html: string): string {
  if (html.includes(SHELL_MARKER)) {
    return html;
  }
  const shell = `
<div ${SHELL_MARKER} style="position:fixed;left:max(16px,env(safe-area-inset-left));bottom:max(16px,env(safe-area-inset-bottom));z-index:2147483647;">
  <a href="/mlclaw" aria-label="Open ML Claw overview" title="ML Claw" style="box-sizing:border-box;display:flex;width:44px;height:44px;aspect-ratio:1/1;align-items:center;justify-content:center;border:1px solid rgba(15,23,42,.14);border-radius:8px;background:rgba(255,255,255,.96);box-shadow:0 10px 24px rgba(15,23,42,.16);text-decoration:none;">
    <img src="/assets/hf-logo.svg" alt="" width="28" height="28" style="display:block;width:28px;height:28px;object-fit:contain;">
  </a>
</div>
`;
  if (html.includes("</body>")) {
    return html.replace("</body>", `${shell}</body>`);
  }
  return `${html}${shell}`;
}
