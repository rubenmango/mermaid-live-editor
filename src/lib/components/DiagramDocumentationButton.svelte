<script lang="ts">
  import { Button } from '$/components/ui/button';
  import { TID } from '$/constants';
  import { getDiagramDocumentationUrl } from '$/util/diagramDocs';
  import { describeDiagram } from '$/util/diagramTypes';
  import { validatedState } from '$/util/state.svelte';
  import BookIcon from '~icons/material-symbols/book-2-outline-rounded';

  const doc = $derived.by(() => {
    const { diagramType, editorMode } = validatedState.current;
    return {
      key: describeDiagram(diagramType)?.id ?? '',
      url: getDiagramDocumentationUrl(diagramType, editorMode)
    };
  });
</script>

<Button
  variant="ghost"
  size="sm"
  data-testid={TID.diagramDocumentationButton}
  href={doc.url}
  target="_blank"
  rel="noopener noreferrer"
  title="View documentation for {doc.key.replace('Diagram', '')} diagram">
  <BookIcon />
  Docs
</Button>
