<script lang="ts">
  import { Button, type ButtonSize } from '$/components/ui/button';
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import Mark from '~icons/custom/mermaid-ai-mark';
  import {
    productButtonVariants,
    showProductMark,
    type ProductButtonProduct,
    type ProductButtonTone
  } from './productButton';

  type Props = {
    product: ProductButtonProduct;
    tone: ProductButtonTone;
    mark?: boolean;
    size?: ButtonSize;
    class?: string;
    children?: Snippet;
  } & HTMLButtonAttributes &
    HTMLAnchorAttributes;

  let {
    product,
    tone,
    mark,
    size = 'sm',
    class: className,
    href,
    target,
    rel,
    children,
    ...rest
  }: Props = $props();
</script>

<Button
  {href}
  {size}
  variant="ghost"
  class={productButtonVariants({ class: className, product, tone })}
  target={href ? '_blank' : target}
  rel={href ? 'noopener noreferrer' : rel}
  {...rest}>
  {#if showProductMark(product, tone, mark)}
    <Mark />
  {/if}
  {@render children?.()}
</Button>
