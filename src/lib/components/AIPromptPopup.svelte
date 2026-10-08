<script lang="ts">
  import ProductButton from '$/components/actions/ProductButton.svelte';
  import CloseIcon from '~icons/material-symbols/close-rounded';

  interface Props {
    show: boolean;
    input: string;
    onClose: () => void;
    onHeightChange?: (height: number) => void;
    onTryFree: () => void;
  }

  let { show, input = $bindable(), onClose, onHeightChange, onTryFree }: Props = $props();

  let textarea = $state<HTMLTextAreaElement>();
  let container = $state<HTMLDivElement>();

  $effect(() => {
    if (!container || !onHeightChange) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target instanceof HTMLElement) {
          onHeightChange(entry.target.offsetHeight);
        }
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  });

  function resizeTextarea() {
    if (!textarea) return;
    const computed = globalThis.getComputedStyle(textarea);
    const lineHeight =
      Number.parseFloat(computed.lineHeight) || Number.parseFloat(computed.fontSize) * 1.5 || 0;
    const paddingTop = Number.parseFloat(computed.paddingTop) || 0;
    const paddingBottom = Number.parseFloat(computed.paddingBottom) || 0;
    const minHeight = lineHeight + paddingTop + paddingBottom;
    const maxLines = 8;
    const maxHeight = lineHeight * maxLines + paddingTop + paddingBottom;

    textarea.style.height = 'auto';
    const nextHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight));
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }

  $effect(() => {
    if (input !== undefined) {
      resizeTextarea();
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (show && e.key === 'Escape') {
      onClose();
    }
  }

  function handleOutsideClick(e: MouseEvent) {
    if (show && container && e.target instanceof Node && !container.contains(e.target)) {
      onClose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} onmousedown={handleOutsideClick} />

{#if show}
  <div
    bind:this={container}
    class="relative z-50 mr-6 flex w-auto flex-col gap-2 rounded-xl border-2 border-ai-edge bg-background p-2 shadow-xl dark:bg-secondary"
    role="dialog"
    aria-label="Ask AI to edit this diagram"
    aria-modal="true"
    tabindex="-1">
    <div class="relative flex min-h-2 items-start gap-1 px-1">
      <textarea
        bind:this={textarea}
        bind:value={input}
        onkeydown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
              onTryFree();
            }
          }
        }}
        placeholder="Describe what to add or change"
        rows="1"
        class="focus font-recursive min-h-0 flex-1 resize-none border-none bg-transparent px-1 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:ring-0 focus:outline-none disabled:opacity-50 dark:text-foreground dark:placeholder:text-muted-foreground"
        style="height: 20px; overflow-y: hidden;"></textarea>
      <button
        aria-label="Close"
        onclick={onClose}
        class="text-muted-foreground hover:text-foreground">
        <CloseIcon class="size-4" />
      </button>
    </div>

    <div class="flex items-center justify-between">
      <span class="font-recursive text-xs font-normal text-foreground dark:text-foreground"
        >Runs in mermaid.ai · free account</span>
      <ProductButton product="ai" tone="solid" mark={false} onclick={onTryFree}>
        Continue
      </ProductButton>
    </div>
  </div>
{/if}
