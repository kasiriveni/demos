---
description: "Use when writing or refactoring CSS, stylesheets, responsive layout rules, component styles, utility classes, or animations for this static site. Covers CSS organization, variables, selector patterns, responsive behavior, and motion."
name: "CSS Coding Standards"
applyTo: "**/*.css"
---

# CSS Coding Standards

- Follow the existing formatting style: one selector block per section, opening braces on the same line, and 4-space indentation inside rules.
- Prefer class-based selectors and keep specificity low. Avoid IDs, long descendant chains, and `!important` unless you are intentionally overriding legacy behavior and cannot solve it structurally.
- Reuse existing `:root` custom properties for colors, shadows, and theme values before adding new literals. When a new color or shadow will be reused, promote it to a custom property instead of repeating raw values.
- Keep styles grouped by concern. Put shared foundations in `assets/css/base.css`, reusable UI pieces in `assets/css/components.css`, utilities in `assets/css/utilities.css`, and leave `styles.css` for legacy or page-level rules unless the task is explicitly refactoring structure.
- Match the current visual system: bold gradients, dark surfaces, rounded cards, and clear hover states. New styles should extend that language instead of introducing an unrelated theme.
- Keep state and variant rules close to their base selector, including `:hover`, `:focus-visible`, pseudo-elements, and modifier classes.
- Prefer layout patterns already used in the project, such as flexbox, grid, and `auto-fit` or `minmax()` for responsive cards, before introducing more complex positioning.
- Add responsive adjustments intentionally. Keep breakpoints near the component they affect, and make sure new sections remain usable on mobile widths without horizontal scrolling.
- When adding animation, keep it purposeful and lightweight. Add a `prefers-reduced-motion` fallback for new motion-heavy behavior.
- Preserve accessibility in styling: maintain readable contrast, keep interactive affordances visible, and never remove focus indicators without replacing them with a clear custom focus style.
- Comment only at section level when it helps orient the stylesheet, using short labels like the existing file headings. Avoid redundant inline comments for obvious declarations.
