# align-last-flex-row

A TypeScript utility library that provides a solution for the common flexbox issue where the last row of items in a wrapped flex container may not align with the grid above it.

## Problem

When using CSS flexbox with `flex-wrap`, the last row often doesn't align with the grid pattern if it contains fewer items than the other rows. This creates an uneven appearance where the last row's items spread out to fill the entire container width.

Before:
```
[Item] [Item] [Item] [Item]  // Row 1
[Item] [Item] [Item] [Item]  // Row 2
[    Item   ] [    Item   ]  // Row 3 (items spread out)
```

After:
```
[Item] [Item] [Item] [Item]  // Row 1
[Item] [Item] [Item] [Item]  // Row 2
[Item] [Item] [-----------]  // Row 3 (items aligned with grid)
```

## Installation

```bash
npm install align-last-flex-row
```

## Usage

```typescript
import { alignLastFlexLine } from 'align-last-flex-row';

// Get your flex container element
const flexContainer = document.querySelector('.flex-container');

// Apply the alignment fix
alignLastFlexLine(flexContainer);
```

### HTML Structure

```html
<div class="flex-container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <!-- ... more items ... -->
</div>
```

### CSS Requirements

Your flex container should have these properties:

```css
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Optional: The function will detect the gap automatically */
}
```

## How It Works

The `alignLastFlexLine` function:

1. Analyzes your flex container to determine the current grid layout (rows and columns)
2. Calculates how many items are missing in the last row to match the grid pattern
3. Creates (or updates) an invisible div with the necessary width to force the last row's items to align with the grid above
4. Automatically handles different grid sizes and gaps between items

## API Reference

### alignLastFlexLine(element: HTMLElement): void

Aligns the last row of a wrapped flex container to match the grid pattern of previous rows.

#### Parameters

- `element: HTMLElement` - The flex container element to align

#### Returns

- `void` - The function modifies the DOM directly

## Browser Support

This utility works in all modern browsers that support:
- CSS Flexbox
- Element.offsetLeft/offsetTop properties
- Element.classList

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## About

Created by [um-dev](https://urmoov.dev)