<script lang="ts">
  import ProductButton from '$/components/actions/ProductButton.svelte';
  import McWrapper from '$/components/McWrapper.svelte';
  import {
    advanceRotation,
    cycleIntervalMs,
    prefersReducedMotion
  } from '$/util/actions/enhancedEditRotation';
  import { describeDiagram } from '$/util/diagramTypes';
  import { validatedState, urls } from '$/util/state.svelte';
  import { logMermaidChartClick } from '$/util/stats';
  import { untrack } from 'svelte';
  import { quintInOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import EyeIcon from '~icons/material-symbols/visibility-outline-rounded';
  import MicIcon from '~icons/material-symbols/mic-outline-rounded';
  import SparkleIcon from '~icons/custom/use-chat';

  const showVisualEdit = $derived(
    describeDiagram(validatedState.current.diagramType)?.visualEdit ?? false
  );

  interface EnhancedEditAction {
    campaign: string;
    icon?: 'eye' | 'mic' | 'sparkle';
    label: string;
    medium: 'ai_edit' | 'visual_edit' | 'voice_edit';
    source: string;
  }

  let currentActionIndex = $state(0);
  let stepsTaken = $state(0);
  let stopped = $state(false);
  let paused = $state(false);
  const reducedMotion = prefersReducedMotion();

  const availableActions = $derived.by<EnhancedEditAction[]>(() => {
    if (!validatedState.current.diagramType) {
      return [];
    }

    const actions: EnhancedEditAction[] = [
      {
        campaign: 'voice_1',
        icon: 'mic',
        label: 'with voice',
        medium: 'voice_edit',
        source: 'voiceEdit'
      },
      {
        campaign: 'ai_1',
        icon: 'sparkle',
        label: 'with AI',
        medium: 'ai_edit',
        source: 'aiEdit'
      }
    ];

    if (showVisualEdit) {
      actions.unshift({
        campaign: 'visual_1',
        icon: 'eye',
        label: 'visually',
        medium: 'visual_edit',
        source: 'visualEdit'
      });
    }

    return actions;
  });

  const actionKey = $derived(availableActions.map((action) => action.source).join('|'));
  let previousActionKey = '';

  const currentAction = $derived.by(() => {
    const actions = availableActions;
    if (actions.length === 0) {
      return undefined;
    }

    return actions[currentActionIndex % actions.length];
  });

  $effect(() => {
    if (actionKey === previousActionKey) {
      return;
    }
    previousActionKey = actionKey;
    currentActionIndex = 0;
    stepsTaken = 0;
    stopped = false;
  });

  $effect(() => {
    const actionCount = availableActions.length;
    if (actionCount <= 1 || reducedMotion || paused || stopped) {
      return;
    }

    const intervalID = setInterval(() => {
      const next = advanceRotation(
        untrack(() => currentActionIndex),
        actionCount,
        untrack(() => stepsTaken)
      );
      currentActionIndex = next.index;
      stepsTaken = next.stepsTaken;
      stopped = next.stopped;
    }, cycleIntervalMs);

    return () => clearInterval(intervalID);
  });
</script>

{#if currentAction}
  <McWrapper>
    <ProductButton
      product="ai"
      tone="tint"
      size="sm"
      href={urls.current.mermaidChart({
        campaign: currentAction.campaign,
        medium: currentAction.medium
      }).save}
      onfocusin={() => (paused = true)}
      onfocusout={() => (paused = false)}
      onmouseenter={() => (paused = true)}
      onmouseleave={() => (paused = false)}
      onclick={() => logMermaidChartClick(currentAction.source)}>
      {#if currentAction.icon === 'eye'}
        <EyeIcon />
      {:else if currentAction.icon === 'mic'}
        <MicIcon />
      {:else if currentAction.icon === 'sparkle'}
        <SparkleIcon class="[&_path]:fill-current" />
      {/if}
      Edit
      {#if reducedMotion}
        <span class="-ml-1">{currentAction.label}</span>
      {:else}
        {#key currentAction.label}
          <span
            class="-ml-1"
            in:slide={{ axis: 'x', delay: 400, easing: quintInOut }}
            out:slide={{ axis: 'x', easing: quintInOut }}>
            {currentAction.label}
          </span>
        {/key}
      {/if}
    </ProductButton>
  </McWrapper>
{/if}
