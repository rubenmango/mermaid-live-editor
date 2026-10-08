import { describe, expect, it } from 'vitest';
import { productButtonVariants, showProductMark } from './productButton';

describe('product button', () => {
  it('uses the accent fill for a solid mermaid.ai button', () => {
    const classes = productButtonVariants({ product: 'ai', tone: 'solid' });
    expect(classes).toContain('bg-accent');
    expect(classes).not.toContain('rounded-full');
  });

  it('uses the same corner radius as a solid button for a mermaid.ai tint button', () => {
    const classes = productButtonVariants({ product: 'ai', tone: 'tint' });
    expect(classes).toContain('rounded-md');
    expect(classes).not.toContain('rounded-full');
    expect(classes).toContain('bg-primary');
    expect(classes).toContain('text-primary-foreground');
    expect(classes).toContain('[&_svg]:text-accent');
    expect(classes).toContain('hover:bg-[color-mix(in_srgb,var(--primary),black_12%)]');
    expect(classes).not.toContain('border-2');
    expect(classes).not.toContain('ring-ai-edge');
  });

  it('uses the flow fill for a solid Mermaid Flow button', () => {
    const classes = productButtonVariants({ product: 'flow', tone: 'solid' });
    expect(classes).toContain('bg-flow');
    expect(classes).toContain('text-flow-foreground');
  });

  it('uses the same corner radius as a solid button for a Mermaid Flow tint button', () => {
    const classes = productButtonVariants({ product: 'flow', tone: 'tint' });
    expect(classes).toContain('rounded-md');
    expect(classes).not.toContain('rounded-full');
    expect(classes).toContain('bg-flow-tint');
    expect(classes).toContain('border-flow');
    expect(classes).toContain('text-flow');
    expect(classes).not.toContain('ring-flow-edge');
  });

  it('shows the mermaid.ai mark only on a solid mermaid.ai button', () => {
    expect(showProductMark('ai', 'solid')).toBe(true);
    expect(showProductMark('ai', 'tint')).toBe(false);
    expect(showProductMark('flow', 'solid')).toBe(false);
    expect(showProductMark('flow', 'tint')).toBe(false);
    expect(showProductMark('ai', 'solid', false)).toBe(false);
    expect(showProductMark('ai', 'tint', true)).toBe(true);
  });
});
