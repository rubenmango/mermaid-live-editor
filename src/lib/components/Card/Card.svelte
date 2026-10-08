<script lang="ts">
  import {
    chromeBodyClass,
    chromeCardClass,
    chromeHeaderClass,
    chromeHeaderIconClass,
    chromeHeaderSwitcherClass,
    chromeIconClass
  } from '$/components/chrome/chrome';
  import type { Tab } from '$/types';
  import type { Component, Snippet } from 'svelte';
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import CollapseAllIcon from '~icons/material-symbols/collapse-all-rounded';
  import Tabs from './Tabs.svelte';

  interface Props {
    isClosable?: boolean;
    isOpen?: boolean;
    isStackable?: boolean;
    tabs?: Tab[];
    activeTabID?: string;
    title?: string;
    icon?: {
      component: Component;
      class?: string;
    };
    onselect?: (tab: Tab) => void;
    actions?: Snippet;
    children: Snippet;
  }

  let {
    isClosable = true,
    isOpen = false,
    isStackable = false,
    tabs = [],
    activeTabID = '',
    title,
    icon,
    onselect,
    actions,
    children
  }: Props = $props();

  const toggleCardOpen = () => {
    if (isClosable) {
      isOpen = !isOpen;
    }
  };
</script>

<div
  class={[
    chromeCardClass,
    isOpen && 'isOpen flex-grow',
    isStackable ? 'flex-1 group-has-[.isOpen]:w-full group-has-[.isOpen]:flex-none' : 'w-full'
  ]}>
  <div
    role="toolbar"
    tabindex="0"
    class={[
      chromeHeaderClass,
      isOpen && tabs.length > 0 ? chromeHeaderSwitcherClass : chromeHeaderIconClass
    ]}
    onclick={toggleCardOpen}
    onkeypress={toggleCardOpen}>
    {#if icon || title}
      <span role="menubar" tabindex="0" class="flex w-fit items-center gap-2 text-sm font-normal">
        {#if icon}
          <icon.component class={[chromeIconClass, icon.class]} />
        {/if}
        {title}
      </span>
    {/if}
    {#if isOpen && tabs && tabs.length > 0}
      <Tabs {onselect} {tabs} {activeTabID} />
    {/if}

    {@render actions?.()}

    {#if isOpen && isClosable}
      <CollapseAllIcon class={chromeIconClass} />
    {/if}
  </div>
  {#if isOpen}
    <div class={chromeBodyClass} transition:slide={{ easing: quintOut }}>
      {@render children()}
    </div>
  {/if}
</div>
