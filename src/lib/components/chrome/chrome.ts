/**
 * Shared classes for control groups. The reasons are in ./README.md.
 * Navbar actions do not use these classes.
 */

/** Material Symbols glyphs in the chrome are 20px. */
export const chromeIconClass = 'size-5';

/**
 * Icon-only bars: pan/zoom, hand-drawn, version. 4px padding, 16px corners.
 * Inner controls use 12px so their curve sits parallel to the 16px bar.
 */
export const chromeGroupClass =
  'flex items-center justify-between gap-1 rounded-[16px] bg-muted p-1 [&_a]:rounded-[12px] [&_button]:rounded-[12px]';

/**
 * A control inside a 16px group, with 4px of the group showing around it.
 * 16 - 4 = 12, so the inner corner sits parallel to the outer one.
 */
export const chromeNestedRadiusClass = 'rounded-[12px]';

/** Pattern chips use the inner 12px corner, so they follow the 16px card. */
export const chromeChipRadiusClass = chromeNestedRadiusClass;

/** Cards that group controls: editor, sample diagrams, actions, history. */
export const chromeCardClass =
  'card flex h-fit flex-col overflow-hidden rounded-[16px] border-2 border-muted bg-muted';

/**
 * Content inside a card. Inset 2px, plus the 2px border, is 4px from the outer edge.
 * 16 - 4 = 12, so this corner runs parallel to the card. The fill is the page color,
 * so the muted card shows in the corner the way a window frame shows around a page.
 */
export const chromeBodyClass =
  'm-0.5 min-h-0 flex-grow overflow-hidden rounded-[12px] bg-background';

/** Shared header row. Side padding lives on the icon and switcher variants. */
export const chromeHeaderClass =
  'flex flex-none cursor-pointer items-center justify-between bg-muted whitespace-nowrap';

/** Icon headers (Sample Diagrams, Actions): 12px above, below, and on the sides. */
export const chromeHeaderIconClass = 'h-11 px-3 py-1';

/**
 * Switcher header. 2px of left padding plus the 2px card border puts Code
 * 4px from the outer corner, the same gap it has above. Docs stays at 12px.
 */
export const chromeHeaderSwitcherClass = 'h-[42px] pt-0.5 pr-3 pb-1 pl-0.5';
