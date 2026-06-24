import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "url query parameter is required" },
      { status: 400 }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  try {
    const res = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      },
    });
    const html = await res.text();

    const title =
      extractMeta(html, "og:title") ??
      extractTitleTag(html) ??
      parsedUrl.hostname;
    const description =
      extractMeta(html, "og:description") ??
      extractMeta(html, "description") ??
      "";
    const image = extractMeta(html, "og:image");
    const thumbnailUrl = image ? resolveUrl(image, parsedUrl) : null;

    return NextResponse.json({
      url: parsedUrl.toString(),
      title,
      description,
      thumbnailUrl,
    });
  } catch {
    return NextResponse.json({
      url: parsedUrl.toString(),
      title: parsedUrl.hostname,
      description: "",
      thumbnailUrl: null,
    });
  }
}

function extractMeta(html: string, key: string): string | undefined {
  const tagRegex = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]*>`,
    "i"
  );
  const tag = html.match(tagRegex)?.[0];
  if (!tag) return undefined;
  const content = tag.match(/content=["']([^"']*)["']/i)?.[1];
  return content ? decodeHtmlEntities(content) : undefined;
}

function extractTitleTag(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? decodeHtmlEntities(match[1].trim()) : undefined;
}

function resolveUrl(maybeRelative: string, base: URL): string {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return maybeRelative;
  }
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
