<script lang="ts">
  import { chromeGroupClass } from '$/components/chrome/chrome';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class={chromeGroupClass}>
  {@render children()}
</div>
