<script lang="ts">
  import { getCheckoutUrl } from '$/util/util';
  import type { Snippet } from 'svelte';

  interface Props {
    closeBanner: Snippet;
    onBannerClick?: () => void;
  }

  let { closeBanner, onBannerClick }: Props = $props();

  const url = getCheckoutUrl({ utmCampaign: 'oss_coupon', utmMedium: 'banner_ad' });
</script>

<div class="flex w-full items-center bg-[#E0095F] p-1.5" role="banner">
  <div class="grid grow">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      class="col-start-1 row-start-1 flex items-center justify-center gap-4 no-underline"
      onclick={onBannerClick}>
      <span class="text-base font-normal text-white">
        Try Mermaid Advanced Editor — OSS users get 10% off with code JS26
      </span>
      <span
        class="inline-flex h-8 shrink-0 items-center rounded-md bg-[#1E1A2E] px-3 text-xs font-medium text-white">
        Get started
      </span>
    </a>
  </div>
  {@render closeBanner()}
</div>
