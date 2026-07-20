# Frontend Stack Skill

**Description:** Build with React 18 + Vite + Tailwind CSS—fast development, hot-reload, and utility-first styling.

**Use when:**
- Creating new React components
- Modifying App.jsx state and effects
- Adding Tailwind CSS classes
- Integrating with backend API endpoints
- Debugging state issues or race conditions
- Optimizing re-renders with useMemo/useCallback
- Working with dark-mode or accessibility features

## Key Stack
- **Framework:** React 18.2.0
- **Build Tool:** Vite 4.2.1 (hot reload enabled)
- **Styling:** Tailwind CSS 4.3.1
- **Port:** 5173 (default Vite dev server)

## Key Files
- `frontend/src/App.jsx` - Main component, state management
- `frontend/src/main.jsx` - Entry point
- `frontend/src/api.js` - API integration (fetch wrapper)
- `frontend/src/components/` - Reusable components
- `frontend/tailwind.config.cjs` - Tailwind configuration

## Component Structure
```
src/
├── components/
│   ├── Button.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── TodoList.jsx
│   ├── TodoItem.jsx
│   ├── InputForm.jsx
│   └── TipSection.jsx
└── ...
```

## Common Tasks

### Create a Component
```jsx
// frontend/src/components/MyComponent.jsx
export function MyComponent({ title, onAction }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">{title}</h2>
      <button
        onClick={onAction}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Action
      </button>
    </div>
  );
}
```

### Call Backend API
```javascript
// In frontend/src/api.js or component
const response = await fetch('http://localhost:3000/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New task' })
});
const data = await response.json();
```

### Use State Management
```jsx
const [todos, setTodos] = useState([]);

useEffect(() => {
  // Fetch initial data
  getTodos().then(setTodos);
}, []);
```

## Scripts
- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm start` - Serve dev server

## Tips
- Vite hot-reloads on save (no refresh needed)
- Tailwind classes are tree-shaken in build
- Use React DevTools extension for debugging
- Keep API calls in api.js for centralization
