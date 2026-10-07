export type GistNavigation =
  { href: string; ok: true } | { ok: false; reason: 'empty' | 'invalid' };

const GIST_HOSTS = new Set(['gist.github.com', 'gist.githubusercontent.com']);

/** Build a same-page `?gist=` URL, or reject input that is not an https GitHub Gist. */
export const gistNavigation = (pathname: string, raw: string): GistNavigation => {
  const gistURL = raw.trim();
  if (!gistURL) {
    return { ok: false, reason: 'empty' };
  }

  let parsed: URL;
  try {
    parsed = new URL(gistURL);
  } catch {
    return { ok: false, reason: 'invalid' };
  }

  if (parsed.protocol !== 'https:' || !GIST_HOSTS.has(parsed.hostname)) {
    return { ok: false, reason: 'invalid' };
  }

  const target = new URL(pathname, 'https://mermaid.live');
  target.searchParams.set('gist', parsed.toString());
  return { href: `${target.pathname}${target.search}`, ok: true };
};
