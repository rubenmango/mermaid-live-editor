# Editor chrome

Controls are split into two sizes on purpose. A group that holds several controls is larger than a single action in the navbar.

## Icons

One library, one size.

Chrome icons are Material Symbols, the rounded outline style, at 20px. Code, Config, Docs, zoom, Sample Diagrams, and Actions all use that set. A 20px glyph sits in a 32px icon button, which leaves 6px of the button around the icon.

The Mermaid logo stays a custom mark. GitHub stays the MDI icon, because Material Symbols has no GitHub glyph.

## Groups

A group is a bar with more than one control: pan and zoom, hand-drawn and grid, version and theme, and the headers on Code, Sample Diagrams, and Actions.

They read as clusters, so they stay taller than a navbar button.

- 4px padding on every side of a group. The card border is 2px and sits above the Code / Config row, so that row uses 2px on top and 4px on the bottom. Both gaps around the chip are then 4px. The same 2px sits on the left, so Code is 4px from the outer corner. Docs stays 12px from the right.
- Sample Diagrams and Actions keep 12px on the left and right, the same space the icon has above and below. The collapse icon uses that same inset.
- A control inside a 16px bar uses a 12px corner, so the two curves sit parallel. The editor, Sample Diagrams, and Actions use that same pair: the card is 16px, and the content inside is inset and 12px, so the inner corner follows the outer one instead of meeting it in a square cut. Pattern chips use that 12px corner too.
- Code / Config is a switcher. Selected uses the same primary fill as Share. The side that is off uses the muted text color, so it is less bright. Hover and press use the primary fill at 80%.
- The type is Recursive, the linear cut (no casual, no cursive). Chrome labels are 14px. The banner is the same face at 16px.
- 16px corners.
- Icon-only bars (zoom, grid, version) are 40px tall: the 32px icon button plus 4px above and below.
- Card headers are 44px tall: a labeled tab is 36px, plus the same 4px above and below. Sample Diagrams and Actions use that same header, so the three cards line up.

The classes live in `chrome.ts`. Toolbars and cards import them instead of repeating the numbers.

## Navbar buttons

Share, Contact sales, and Save diagram are the small actions. Each one is 32px tall.

Share and Contact sales are the same button: small, muted fill. Save diagram is the same size with the pink accent fill. That is the only color difference on that row.

Ghost is a different role. It is the transparent style on the zoom bar and on Code, Config, and Docs. It is not a third navbar color.
