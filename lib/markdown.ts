// Pure functions — importable on client AND server

export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;
  let para: string[] = [];

  const flush = () => {
    if (para.length) {
      out.push(`<p>${para.join(" ")}</p>`);
      para = [];
    }
  };
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };
  const inline = (s: string) =>
    s
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  for (const raw of lines) {
    const t = raw.trim();
    if (!t) {
      flush();
      closeList();
      continue;
    }
    if (t.startsWith("### ")) {
      flush();
      closeList();
      out.push(`<h3>${inline(t.slice(4))}</h3>`);
      continue;
    }
    if (t.startsWith("## ")) {
      flush();
      closeList();
      out.push(`<h2>${inline(t.slice(3))}</h2>`);
      continue;
    }
    if (t.startsWith("- ")) {
      flush();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(t.slice(2))}</li>`);
      continue;
    }
    closeList();
    para.push(inline(t));
  }
  flush();
  closeList();
  return out.join("\n");
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
