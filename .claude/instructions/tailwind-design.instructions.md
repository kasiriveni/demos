---
description: "Use when styling React components with Tailwind CSS and implementing responsive design. Covers utility classes, custom properties, dark mode, and mobile-first approach."
name: "Tailwind CSS & Responsive Design"
applyTo: "frontend/src/**/*.jsx, frontend/src/**/*.css"
---

# Tailwind CSS & Responsive Design

## Tailwind CSS Basics

### Class Organization in JSX

Group classes logically for readability:

```jsx
// Layout + Spacing
<div className="flex gap-4 p-4">

// Display + Alignment
<button className="flex items-center justify-center">

// Colors + States
<div className="bg-white dark:bg-gray-900 hover:bg-gray-50">

// Typography
<h1 className="text-2xl font-bold text-gray-900">

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
</div>
```

### Class Naming Convention

```jsx
// ❌ Bad - all classes inline, hard to read
<div className="flex justify-between items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">

// ✅ Good - organized by concern
<div className="
  flex justify-between items-center
  p-6
  bg-white dark:bg-gray-800
  border border-gray-200 dark:border-gray-700
  rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">
```

### Component-Level Styling

```jsx
// Define base classes as constants
const buttonClasses = `
  px-4 py-2
  bg-blue-500 hover:bg-blue-600
  text-white font-medium
  rounded-lg
  transition-colors
  disabled:opacity-50 disabled:cursor-not-allowed
`;

export function Button({ children, disabled }) {
  return (
    <button className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
}

// Or use template literals for variants
function Button({ variant = 'primary', children }) {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };

  return (
    <button className={`px-4 py-2 rounded ${variants[variant]}`}>
      {children}
    </button>
  );
}
```

## Responsive Design: Mobile-First

### Breakpoint Strategy

```jsx
// Mobile-first approach: start with mobile, add complexity for larger screens
<div className="
  grid grid-cols-1      // Mobile: 1 column
  sm:grid-cols-2        // Small: 2 columns (640px+)
  md:grid-cols-3        // Medium: 3 columns (768px+)
  lg:grid-cols-4        // Large: 4 columns (1024px+)
  gap-4
">
  {/* items */}
</div>
```

### Tailwind Breakpoints

| Prefix | CSS | Use |
|--------|-----|-----|
| (none) | - | Mobile (< 640px) |
| `sm:` | @media (min-width: 640px) | Small phones |
| `md:` | @media (min-width: 768px) | Tablets |
| `lg:` | @media (min-width: 1024px) | Laptops |
| `xl:` | @media (min-width: 1280px) | Desktops |
| `2xl:` | @media (min-width: 1536px) | Large screens |

### Common Responsive Patterns

**Flexbox Stack**
```jsx
// Stack vertically on mobile, horizontally on desktop
<div className="flex flex-col gap-4 md:flex-row">
  <div className="flex-1">Left column</div>
  <div className="flex-1">Right column</div>
</div>
```

**Grid Layout**
```jsx
// 1 column mobile → 2 columns tablet → 3 columns desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} item={item} />
  ))}
</div>
```

**Responsive Text**
```jsx
// Font size grows with screen size
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Heading
</h1>
```

**Responsive Padding**
```jsx
// Padding adjusts for screen size
<div className="p-4 md:p-6 lg:p-8">
  Content
</div>
```

**Responsive Display**
```jsx
// Show/hide elements based on screen size
<div className="hidden md:block">
  {/* Only visible on tablets and up */}
</div>

<div className="md:hidden">
  {/* Only visible on mobile */}
</div>
```

## Dark Mode Implementation

### Enable Dark Mode in tailwind.config.js

```javascript
module.exports = {
  darkMode: 'class',  // Or 'media' for system preference
  theme: {
    extend: {
      colors: {
        // Custom colors
      }
    }
  }
};
```

### Dark Mode Classes

```jsx
// Light mode (default) / Dark mode
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">Heading</h1>
  <p className="text-gray-600 dark:text-gray-300">Paragraph</p>
</div>
```

### Dark Mode Toggle Implementation

```jsx
// DarkModeToggle.jsx
import { useEffect, useState } from 'react';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Check stored preference or system preference
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update DOM and store preference
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}

// Usage in App.jsx
export default function App() {
  return (
    <>
      <Header>
        <DarkModeToggle />
      </Header>
      <main className="bg-white dark:bg-gray-900 transition-colors">
        {/* content */}
      </main>
    </>
  );
}
```

## Custom CSS with Tailwind

### When to Use @apply

Use `@apply` to extract repeated patterns into utility classes:

```css
/* styles.css */

/* ❌ Bad - too many @apply rules */
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}

.btn-secondary {
  @apply px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300;
}

/* ✅ Good - use composition in components */
/* Only use @apply for truly shared, complex patterns */
```

### Complex Responsive Patterns

```css
/* styles.css */

/* Hero section responsive layout */
.hero-grid {
  @apply grid gap-6 md:gap-8 lg:gap-12;
}

@screen md {
  .hero-grid {
    @apply grid-cols-2;
  }
}

@screen lg {
  .hero-grid {
    @apply grid-cols-3;
  }
}
```

## Animation and Transitions

### Using Tailwind Animations

```jsx
// Fade in on mount
<div className="animate-fade-in">Content</div>

// Hover effects with transitions
<button className="
  transition-all duration-200
  hover:scale-105
  active:scale-95
">
  Click me
</button>

// Custom animation in tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  }
};
```

### Respecting prefers-reduced-motion

```jsx
// Component with motion
<div className="
  transition-all duration-300
  motion-reduce:transition-none
">
  Content
</div>

// CSS-level control
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Colors and Theme

### Color Palette Usage

```jsx
// Use consistent colors from theme
<div className="bg-blue-500">Primary</div>
<div className="bg-green-500">Success</div>
<div className="bg-yellow-500">Warning</div>
<div className="bg-red-500">Error</div>
<div className="bg-gray-500">Neutral</div>
```

### Semantic Color Naming

```jsx
// Good: semantic names
<div className="bg-primary">Primary action</div>
<div className="bg-error text-error-text">Error state</div>

// To implement: extend tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'rgb(59 130 246)', // blue-500
        error: 'rgb(239 68 68)',     // red-500
        'error-text': 'rgb(255 255 255)' // white
      }
    }
  }
};
```

## Accessibility with Tailwind

### Focus States

```jsx
// Always include focus indicators
<button className="
  px-4 py-2 rounded
  focus:outline-none
  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
">
  Accessible Button
</button>

// Or use shorthand
<button className="
  px-4 py-2 rounded
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
">
  Button
</button>
```

### Semantic HTML with Tailwind

```jsx
// ✅ Good - semantic HTML, styled with Tailwind
<nav className="flex gap-4">
  <a href="/" className="text-blue-500 hover:underline">Home</a>
  <a href="/about" className="text-blue-500 hover:underline">About</a>
</nav>

// ❌ Avoid - divs styled as buttons
<div className="cursor-pointer" onClick={handleClick}>
  Click me  {/* Not accessible without proper ARIA */}
</div>
```

### Color Contrast

```jsx
// ✅ Good contrast ratios
<div className="bg-white text-gray-900">High contrast</div>
<div className="bg-blue-500 text-white">Good contrast</div>

// ❌ Poor contrast - avoid
<div className="bg-gray-100 text-gray-200">Poor contrast</div>
```

## Performance Tips

### Purge Unused Styles

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    './src/components/**/*.jsx'
  ],
  theme: {
    extend: {}
  }
};
```

### Extract Repeated Patterns

```jsx
// Instead of repeating classes everywhere:

// Create a component
function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {children}
    </div>
  );
}

// Use throughout app
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

## Common Patterns

### Button Styles

```jsx
const buttonVariants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
};

function Button({ variant = 'primary', size = 'md', children, ...props }) {
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`
        ${sizes[size]}
        ${buttonVariants[variant]}
        rounded-lg font-medium
        transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-2 focus-visible:outline-offset-2
      `}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Form Input Styles

```jsx
function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 rounded-lg
          border-2 border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          focus:outline-none focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : ''}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
```

## Debugging Tailwind

```jsx
// Show breakpoint in development
{process.env.NODE_ENV === 'development' && (
  <div className="fixed bottom-0 right-0 p-2 bg-gray-900 text-white text-xs">
    <span className="block sm:hidden">Mobile</span>
    <span className="hidden sm:block md:hidden">Tablet</span>
    <span className="hidden md:block">Desktop</span>
  </div>
)}
```

## Summary Checklist

- ✅ Classes organized by concern (layout, colors, typography)
- ✅ Mobile-first approach used
- ✅ Responsive breakpoints applied appropriately
- ✅ Dark mode implemented with `dark:` prefix
- ✅ Focus states and accessibility considered
- ✅ Color contrast meets WCAG standards
- ✅ Animations respect `prefers-reduced-motion`
- ✅ Custom components extract repeated patterns
- ✅ Tailwind config extended with project colors
- ✅ Unused styles purged in production
