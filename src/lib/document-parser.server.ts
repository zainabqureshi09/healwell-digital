import pdf from "pdf-parse";
import mammoth from "mammoth";
import cheerio from "cheerio";

export async function parsePdf(buffer: Buffer): Promise<string> {
  const data = await pdf(buffer);
  return data.text;
}

export async function parseDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export async function parseHtml(html: string): Promise<string> {
  const $ = cheerio.load(html);
  // Remove script and style elements
  $("script, style").remove();
  return $("body").text().replace(/\s+/g, " ").trim();
}

export function chunkText(text: string, size = 1000, overlap = 200): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= size) return [clean];
  const out: string[] = [];
  let i = 0;
  while (i < clean.length) {
    out.push(clean.slice(i, i + size));
    i += size - overlap;
  }
  return out;
}
