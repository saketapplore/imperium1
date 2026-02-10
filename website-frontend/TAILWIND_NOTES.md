# Tailwind CSS 4 Configuration Notes

## Important Changes in Tailwind CSS 4

Tailwind CSS 4 has moved the PostCSS plugin to a separate package. This is why we need to use `@tailwindcss/postcss` instead of `tailwindcss` in the PostCSS configuration.

## PostCSS Configuration

**Correct configuration for Tailwind CSS 4:**

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

**Note:** Since the project uses `"type": "module"` in `package.json`, we must use ES module syntax (`export default`) instead of CommonJS (`module.exports`).

## CSS Linter Warnings

You may see linter warnings about unknown at-rules like `@tailwind`, `@apply`, `@layer`, etc. These are **expected and safe to ignore**. They are Tailwind CSS directives that:
- Are not recognized by standard CSS linters
- Work perfectly fine at runtime
- Are processed by the Tailwind CSS PostCSS plugin

## Dependencies

The project includes:
- `tailwindcss@^4.1.18` - Main Tailwind CSS package
- `@tailwindcss/postcss@^4.1.18` - PostCSS plugin for Tailwind CSS 4
- `autoprefixer@^10.4.23` - Adds vendor prefixes automatically
- `postcss@^8.5.6` - PostCSS processor

## Tailwind Directives Used

### In index.css:
```css
@import url('...');           /* Import Google Fonts */
@tailwind base;               /* Tailwind's base styles */
@tailwind components;         /* Tailwind's component classes */
@tailwind utilities;          /* Tailwind's utility classes */

@layer base { ... }           /* Custom base styles */
@layer components { ... }     /* Custom component classes */
@layer utilities { ... }      /* Custom utility classes */

.class-name {
  @apply ...;                 /* Apply Tailwind utilities */
}
```

All of these directives are valid Tailwind CSS syntax and will be processed correctly by the build system.
