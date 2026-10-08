<script lang="ts">
  import ProductButton from '$/components/actions/ProductButton.svelte';
  import McWrapper from '$/components/McWrapper.svelte';
  import { urls } from '$/util/state.svelte';
  import { logMermaidChartClick } from '$/util/stats';
  import { getContactSalesUrl } from '$/util/util';
  import CloudUploadIcon from '~icons/material-symbols/cloud-upload-outline-rounded';
  import MailIcon from '~icons/material-symbols/mail-outline-rounded';
</script>

<McWrapper labelPrefix="Opens ">
  <ProductButton
    product="ai"
    tone="tint"
    size="sm"
    href={getContactSalesUrl()}
    onclick={() => logMermaidChartClick('contactSales')}>
    <MailIcon />
    Contact sales
  </ProductButton>
</McWrapper>
<McWrapper>
  <ProductButton
    product="ai"
    tone="tint"
    size="sm"
    class="text-foreground shadow-sm hover:text-foreground"
    href={urls.current.mermaidChart({ medium: 'save_diagram' }).save}
    onclick={() => logMermaidChartClick('saveDiagram')}>
    <CloudUploadIcon />
    Save diagram
  </ProductButton>
</McWrapper>
