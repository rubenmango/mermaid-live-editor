<script lang="ts">
  import { C } from '$/constants';
  import { MCBaseURL } from '$/util/util';
  import { onDestroy, type Snippet } from 'svelte';
  import { fade } from 'svelte/transition';

  interface Props {
    closeBanner: Snippet;
    onBannerClick?: () => void;
  }

  let { closeBanner, onBannerClick }: Props = $props();

  interface Taglines {
    label: string;
    url: {
      path: string;
      params: Record<string, string>;
    };
  }

  const commonParams = { utm_source: C.utmSource, utm_medium: 'banner_ad' } as const;

  let taglines: Taglines[] = [
    {
      label: 'Replace ChatGPT Pro, Mermaid.live, and Lucid Chart with Mermaid Chart',
      url: {
        path: '/mermaid-ai',
        params: { utm_campaign: 'aibundle' }
      }
    },
    {
      label: 'Diagram live with teammates in Mermaid Chart',
      url: {
        path: '/landing',
        params: { utm_campaign: 'team_collaboration' }
      }
    },
    {
      label: 'Customize your layout and design in Mermaid Chart’s visual editor!',
      url: {
        path: '/whiteboard',
        params: { utm_campaign: 'visual_editor' }
      }
    }
  ];

  const getRandomIndex = (array: unknown[]) => Math.floor(Math.random() * array.length);

  let index = $state(getRandomIndex(taglines));
  let currentTagline = $derived(taglines[index]);
  let shouldAnimate = $state(true);

  const interval = setInterval(() => {
    if (shouldAnimate) {
      index = (index + 1) % taglines.length;
    }
  }, 5000);

  onDestroy(() => {
    clearInterval(interval);
  });

  const taglineHref = $derived(
    `${MCBaseURL}${currentTagline.url.path}?${new URLSearchParams({
      ...commonParams,
      ...currentTagline.url.params
    }).toString()}`
  );
</script>

<div
  class="flex w-full items-center bg-[#E0095F] p-1.5"
  role="banner"
  onmouseenter={() => (shouldAnimate = false)}
  onmouseleave={() => (shouldAnimate = true)}>
  <div class="grid grow">
    {#key currentTagline}
      <a
        href={taglineHref}
        target="_blank"
        rel="noopener noreferrer"
        class="col-start-1 row-start-1 flex items-center justify-center gap-4 no-underline"
        onclick={onBannerClick}
        in:fade={{ delay: 800 }}
        out:fade={{ duration: 1000 }}>
        <span class="text-base tracking-wider text-white">{currentTagline.label}</span>
        <span
          class="inline-flex h-8 shrink-0 items-center rounded-md bg-[#1E1A2E] px-3 text-xs font-medium text-white">
          Try now
        </span>
      </a>
    {/key}
  </div>
  {@render closeBanner()}
</div>
