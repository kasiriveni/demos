---
description: "Use when creating or modifying React components. Covers component structure, hooks usage, props management, performance optimization, and accessibility."
name: "React Component Standards"
applyTo: "frontend/src/**/*.jsx"
---

# React Component Standards

## Component Structure

- Create functional components using hooks; avoid class components.
- One component per file; use descriptive filenames matching component name (e.g., `TodoItem.jsx` for `TodoItem`).
- Export component as default export at the end of the file.
- Place imports at the top, organized as: React/hooks → third-party → local components → styles.

**Example structure:**
```jsx
import { useState, useEffect } from 'react';
import { Card } from './Card';
import styles from './TodoItem.module.css';

export default function TodoItem({ todo, onDelete }) {
  // component logic
  return (/* JSX */);
}
```

## Props and Prop Types

- Define expected props clearly; use destructuring in function parameters.
- Provide meaningful prop descriptions in comments if props are complex.
- Set sensible default values for optional props using default parameters or function defaults.
- Keep prop passing one level deep when possible; avoid prop drilling for deeply nested components.

**Example:**
```jsx
export default function Button({
  label = 'Click me',
  onClick,
  variant = 'primary',
  disabled = false
}) {
  // ...
}
```

## State Management with Hooks

- Use `useState` for component-level state; keep state as granular as possible.
- Use `useEffect` with dependency arrays to handle side effects; clean up subscriptions.
- Extract complex state logic into custom hooks for reusability.
- Avoid storing derived values in state; compute them during render.

**Good:**
```jsx
const [todos, setTodos] = useState([]);
useEffect(() => {
  fetchTodos().then(setTodos);
}, []);
```

**Avoid:**
```jsx
const [todos, setTodos] = useState([]);
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(todos.length); // Derived value in state
}, [todos]);
```

## Performance Optimization

- Use `useMemo` to memoize expensive computations; include all dependencies in the array.
- Use `useCallback` to memoize functions passed to child components to prevent unnecessary re-renders.
- Wrap components with `React.memo` only if they receive many props that rarely change.
- Use lazy loading with `React.lazy` and `Suspense` for code splitting; load routes or heavy modals on-demand.

**Example:**
```jsx
const filteredTodos = useMemo(() =>
  todos.filter(t => t.completed === filter),
  [todos, filter]
);

const handleDelete = useCallback((id) => {
  setTodos(prev => prev.filter(t => t.id !== id));
}, []);
```

## API Integration

- Place all API calls in a centralized `api.js` file; export functions for each endpoint.
- Handle loading, success, and error states explicitly in the component.
- Display user-friendly error messages; never expose raw API errors.
- Cancel pending requests when a component unmounts to prevent memory leaks.

**Example:**
```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  fetchTodos()
    .then(setTodos)
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);
```

## Styling with Tailwind CSS

- Use Tailwind utility classes directly in JSX; avoid custom CSS unless necessary.
- Group related classes for readability; use comments to separate concerns.
- Avoid long inline classNames; extract to a constant if classname is very long.
- Implement dark mode using Tailwind's `dark:` prefix; test both light and dark themes.

**Example:**
```jsx
<div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
  {/* content */}
</div>
```

## Accessibility (a11y)

- Use semantic HTML: `<button>`, `<input>`, `<label>`, not `<div>` for interactive elements.
- Include `aria-label` or `aria-labelledby` for icon-only buttons or when labels aren't visible.
- Ensure keyboard navigation: interactive elements must be reachable via Tab key.
- Test focus states: visible focus indicators (outline or custom styling).
- Color contrast: text must pass WCAG AA standards (4.5:1 for normal text).

**Example:**
```jsx
<button
  aria-label="Delete todo item"
  onClick={() => onDelete(id)}
  className="focus:outline-none focus:ring-2 focus:ring-offset-2"
>
  🗑️
</button>
```

## Event Handling

- Define event handlers as arrow functions or pass a function reference.
- Always use camelCase event names: `onClick`, `onChange`, `onSubmit`, etc.
- Pass event data or IDs as parameters; avoid using event object directly in closures.

**Example:**
```jsx
const handleDelete = (id) => {
  // Handle deletion
};

<button onClick={() => handleDelete(todo.id)}>Delete</button>
```

## Conditional Rendering

- Use ternary operators for simple conditions; use logical `&&` for showing/hiding.
- Extract complex conditional logic into separate functions for clarity.
- Avoid rendering `null` or `undefined` directly; use falsy checks.

**Example:**
```jsx
{loading && <Spinner />}
{error && <ErrorMessage message={error} />}
{todos.length > 0 ? (
  <TodoList todos={todos} />
) : (
  <EmptyState />
)}
```

## Component Composition

- Keep components focused on a single responsibility.
- Use composition over inheritance; pass functions and data as props.
- Create small, reusable components (Button, Card, Input) instead of large monolithic ones.
- Avoid multiple levels of prop drilling; use Context API or state management for global state.

## Testing Components

- Write tests for user interactions (clicks, input changes, form submissions).
- Test component rendering with different props and states.
- Mock API calls in tests; don't make real requests.
- Test error states and loading states explicitly.
