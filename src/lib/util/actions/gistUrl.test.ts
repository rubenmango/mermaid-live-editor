import { describe, expect, it } from 'vitest';
import { gistNavigation } from './gistUrl';

describe('gistNavigation', () => {
  it('rejects an empty field', () => {
    expect(gistNavigation('/edit', '   ')).toEqual({ ok: false, reason: 'empty' });
  });

  it('rejects non-https and non-gist hosts', () => {
    expect(gistNavigation('/edit', 'http://gist.github.com/a/b')).toEqual({
      ok: false,
      reason: 'invalid'
    });
    expect(gistNavigation('/edit', 'https://example.com/gist')).toEqual({
      ok: false,
      reason: 'invalid'
    });
    expect(gistNavigation('/edit', 'javascript:alert(1)')).toEqual({
      ok: false,
      reason: 'invalid'
    });
  });

  it('encodes a gist URL into the query string', () => {
    const gist = 'https://gist.github.com/octocat/abc123';
    expect(gistNavigation('/edit', `  ${gist}  `)).toEqual({
      href: `/edit?gist=${encodeURIComponent(gist)}`,
      ok: true
    });
  });

  it('keeps a gist revision URL intact', () => {
    const gist = 'https://gist.github.com/octocat/abc123/ec9b4ab0e41e4ff6287326cd3cb47affd7851e19';
    expect(gistNavigation('/edit', gist).ok && gistNavigation('/edit', gist)).toEqual({
      href: `/edit?gist=${encodeURIComponent(gist)}`,
      ok: true
    });
  });
});
