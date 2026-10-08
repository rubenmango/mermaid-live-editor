import { tv, type VariantProps } from 'tailwind-variants';

export const productButtonVariants = tv({
  base: '[&_svg]:!size-4',
  compoundVariants: [
    {
      class:
        'bg-accent text-accent-foreground hover:bg-[color-mix(in_srgb,var(--accent),black_12%)] hover:text-accent-foreground',
      product: 'ai',
      tone: 'solid'
    },
    {
      class:
        'rounded-md bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--primary),black_12%)] hover:text-primary-foreground [&_svg]:text-accent',
      product: 'ai',
      tone: 'tint'
    },
    {
      class: 'bg-flow text-flow-foreground hover:bg-flow/90 hover:text-flow-foreground',
      product: 'flow',
      tone: 'solid'
    },
    {
      class:
        'rounded-md border-2 border-flow bg-flow-tint text-flow hover:border-flow hover:bg-flow hover:text-flow-foreground',
      product: 'flow',
      tone: 'tint'
    }
  ],
  defaultVariants: {
    product: 'ai',
    tone: 'solid'
  },
  variants: {
    product: {
      ai: '',
      flow: ''
    },
    tone: {
      solid: '',
      tint: 'rounded-md'
    }
  }
});

export type ProductButtonProduct = NonNullable<
  VariantProps<typeof productButtonVariants>['product']
>;
export type ProductButtonTone = NonNullable<VariantProps<typeof productButtonVariants>['tone']>;

/** The mermaid.ai mark is on by default for a solid mermaid.ai button. Pass true to keep it on a tint button. */
export const showProductMark = (
  product: ProductButtonProduct,
  tone: ProductButtonTone,
  mark?: boolean
): boolean => {
  if (mark === false || product !== 'ai') {
    return false;
  }
  if (mark === true) {
    return true;
  }
  return tone === 'solid';
};
