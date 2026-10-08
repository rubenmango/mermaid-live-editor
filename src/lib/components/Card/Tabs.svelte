<script lang="ts">
  import { chromeNestedRadiusClass } from '$/components/chrome/chrome';
  import * as ToggleGroup from '$/components/ui/toggle-group';
  import type { Tab } from '$lib/types';

  let {
    tabs,
    activeTabID,
    onselect
  }: {
    tabs: Tab[];
    activeTabID: string;
    onselect?: (tab: Tab) => void;
  } = $props();

  const effectiveTabID = $derived(activeTabID || tabs[0]?.id);

  const selectTab = (next: string | string[]) => {
    if (typeof next !== 'string' || !next || next === effectiveTabID) {
      return;
    }
    const tab = tabs.find((item) => item.id === next);
    if (tab) {
      onselect?.(tab);
    }
  };

  const keepCardOpen = (event: Event) => {
    event.stopPropagation();
  };
</script>

<!--
  Code / Config is a switcher, not a tab strip.
  Selected uses the same primary fill as Share. Hover and press use that fill at 80%.
  py-0 lets the label sit in the middle of the chip, so hover has the same space above and below.
-->
<div onclick={keepCardOpen} onkeypress={keepCardOpen}>
  <ToggleGroup.Root
    type="single"
    size="sm"
    value={effectiveTabID}
    onValueChange={selectTab}
    class="gap-1">
    {#each tabs as tab (tab.id)}
      <ToggleGroup.Item
        value={tab.id}
        class={[
          chromeNestedRadiusClass,
          'h-9 px-2 py-0 font-normal text-muted-foreground hover:bg-primary/80 hover:text-primary-foreground active:bg-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary data-[state=on]:active:bg-primary/80'
        ]}>
        <tab.icon />
        {tab.title}
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
</div>
