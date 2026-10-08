<script lang="ts">
  import { chromeIconClass } from '$/components/chrome/chrome';
  import DesktopEditor from '$/components/DesktopEditor.svelte';
  import ProductButton from '$/components/actions/ProductButton.svelte';
  import McWrapper from '$/components/McWrapper.svelte';
  import MobileEditor from '$/components/MobileEditor.svelte';
  import { TID } from '$/constants';
  import { env } from '$/util/env';
  import { updateCode, updateConfig, urls, validatedState } from '$lib/util/state.svelte';
  import { logMermaidChartClick } from '$lib/util/stats';
  import { debounce } from 'lodash-es';
  import ExclamationCircleIcon from '~icons/material-symbols/error-outline-rounded';

  const { isMobile } = $props<{ isMobile: boolean }>();
  const onUpdate = (text: string) => {
    if (validatedState.current.editorMode === 'code') {
      updateCode(text);
    } else {
      updateConfig(text);
    }
  };

  let showError = $state(false);

  const showErrorDebounced = debounce(() => {
    showError = true;
  }, 3000);

  $effect(() => {
    if (validatedState.current.error) {
      showErrorDebounced();
    } else {
      showErrorDebounced.cancel();
      showError = false;
    }

    return () => {
      showErrorDebounced.cancel();
    };
  });
</script>

<div class="flex h-full flex-col">
  {#if isMobile}
    <MobileEditor {onUpdate} />
  {:else}
    <DesktopEditor {onUpdate} />
  {/if}
  {#if showError && validatedState.current.error instanceof Error}
    <div class="flex flex-col text-sm" data-testid={TID.errorContainer}>
      <div class="flex items-center justify-between gap-2 bg-slate-900 p-2 text-white">
        <div class="flex w-fit items-center gap-2">
          <ExclamationCircleIcon class={[chromeIconClass, 'text-destructive']} aria-hidden="true" />
          <div class="flex flex-col">
            <p>Syntax error</p>
            {#if env.isEnabledMermaidChartLinks && validatedState.current.editorMode === 'code'}
              <p class="text-xs text-white/60" data-testid={TID.aiHelpText}>
                Create a free account to repair with AI
              </p>
            {/if}
          </div>
        </div>
        {#if validatedState.current.editorMode === 'code'}
          <McWrapper>
            <ProductButton
              product="ai"
              tone="solid"
              size="sm"
              data-testid={TID.aiRepairButton}
              href={urls.current.mermaidChart({ medium: 'ai_repair' }).save}
              onclick={() => logMermaidChartClick('aiRepair')}>
              AI Repair
            </ProductButton>
          </McWrapper>
        {/if}
      </div>
      <output class="max-h-32 overflow-auto bg-muted p-2" name="mermaid-error" for="editor">
        <pre
          class="font-mono text-xs leading-[18px]">{validatedState.current.error?.toString()}</pre>
      </output>
    </div>
  {/if}
</div>
