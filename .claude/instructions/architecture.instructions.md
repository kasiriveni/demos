---
description: "Use when making architectural decisions, organizing code structure, and ensuring separation of concerns. Covers folder organization, module boundaries, naming conventions, and code organization."
name: "Architecture and Code Organization"
applyTo: "{backend,frontend,agent-website}/**"
---

# Architecture and Code Organization

## Folder Structure Principles

### Backend (`/backend`)
```
backend/
├── index.js              # Main server entry point
├── routes/               # API route handlers
│   ├── todos.js
│   ├── jokes.js
│   └── tips.js
├── middleware/           # Custom middleware (if added)
├── data/                 # Data storage (JSON files, etc.)
├── __tests__/            # Jest test suite
└── utils/                # Helper utilities (if needed)
```

**Rules:**
- Each route file handles one resource/domain (todos, jokes, tips)
- Keep `index.js` focused on setup and middleware ordering
- Move shared logic to middleware or utils
- Tests mirror the structure of code being tested

### Frontend (`/frontend/src`)
```
frontend/src/
├── main.jsx              # Vite entry point
├── App.jsx               # Root component
├── api.js                # Centralized API calls
├── components/           # Reusable React components
│   ├── Button.jsx
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   └── ...
├── styles/               # Tailwind CSS files
└── utils/                # Helper functions
```

**Rules:**
- One component per file in `components/` folder
- API calls ONLY in `api.js`, not in components
- Shared utilities in `utils/` (formatting, validation, etc.)
- Keep components focused on UI rendering and user interaction

### Agent Website (`/agent-website`)
```
agent-website/
├── index.html            # Entry HTML
├── script.js             # Main initialization script
├── js/
│   ├── main.js           # Feature orchestration
│   └── features/         # Feature modules
│       ├── animations.js
│       ├── content.js
│       ├── navigation.js
│       └── projects.js
├── assets/css/           # Stylesheet organization
│   ├── base.css
│   ├── components.css
│   ├── utilities.css
│   └── styles.css
└── docs/                 # Feature documentation
```

**Rules:**
- Each feature is a standalone module in `js/features/`
- Features export initialization and cleanup functions
- No cross-feature dependencies; use event emitters or callbacks
- CSS organized by specificity/scope (base → components → utilities)

## Module Responsibility and Boundaries

### Backend Responsibilities

| Module | Responsibility | Example |
|--------|---|---|
| `index.js` | Server setup, middleware ordering | CORS, body parsing, error handler |
| `routes/*.js` | Handle requests for one resource | Route logic, validation, response |
| `middleware/` | Cross-cutting concerns | Auth, logging, error handling |
| `data/` | Persistence layer | Read/write JSON, database queries |
| `utils/` | Pure utility functions | String formatting, ID generation |

### Frontend Responsibilities

| Module | Responsibility | Example |
|--------|---|---|
| `App.jsx` | Global state and routing | Top-level state, layout structure |
| `components/` | UI rendering and user interaction | Button, Form, List |
| `api.js` | HTTP communication | Fetch wrapper, endpoint functions |
| `utils/` | Reusable logic | Validators, formatters, helpers |
| `styles/` | Visual presentation | Tailwind, custom CSS |

### Agent Website Responsibilities

| Module | Responsibility | Example |
|--------|---|---|
| `main.js` | Feature lifecycle management | Initialize, mount, cleanup |
| `features/*.js` | Isolated feature logic | Search, animations, navigation |
| `css/` | Visual presentation | Layout, components, utilities |

## Naming Conventions

### Files and Folders

| Type | Convention | Examples |
|------|---|---|
| React Components | PascalCase, `.jsx` | `TodoItem.jsx`, `Button.jsx` |
| Utilities/Helpers | camelCase, `.js` | `formatDate.js`, `api.js` |
| Routes | lowercase, named after resource | `todos.js`, `jokes.js` |
| Middleware | camelCase or descriptive | `errorHandler.js`, `auth.js` |
| Styles | descriptive, `.css` | `base.css`, `components.css` |
| Tests | match source + `.test.js` | `TodoItem.test.js`, `api.test.js` |
| Features | lowercase, feature name | `animations.js`, `content.js` |

### Variables and Functions

| Context | Convention | Examples |
|---------|---|---|
| React Components | PascalCase | `TodoItem`, `TodoList` |
| Functions | camelCase | `handleDelete`, `fetchTodos` |
| Constants | UPPER_SNAKE_CASE | `MAX_TODO_LENGTH`, `API_BASE_URL` |
| Booleans | is/has prefix | `isLoading`, `hasError` |
| Event Handlers | handle + EventName | `handleClick`, `handleSubmit` |

## Import Path Organization

### Absolute vs Relative Imports

**Use relative imports for:**
- Sibling files in same folder
- Components importing from components folder
- Local utilities

```javascript
// Good: relative paths for local code
import { Button } from './Button';
import { formatDate } from '../utils/formatters';
```

**Use absolute imports or module aliases for:**
- Deep nested imports
- Cross-folder imports
- Anything from project root

```javascript
// Consider this if nesting is deep:
import TodoItem from '@/components/TodoItem';
import { fetchTodos } from '@/api';
```

## Code Organization Within Files

### Component File Structure (React)

```jsx
// 1. Imports
import { useState, useEffect } from 'react';
import { fetchTodos } from '../api';
import Button from './Button';
import styles from './TodoList.module.css';

// 2. Constants
const BATCH_SIZE = 20;

// 3. Component
export default function TodoList({ filter }) {
  // State
  const [todos, setTodos] = useState([]);

  // Effects
  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  // Handlers
  const handleDelete = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // Render
  return (
    <div className={styles.list}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
      ))}
    </div>
  );
}
```

### Route Handler File Structure (Express)

```javascript
// 1. Imports
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// 2. Constants or middleware
const validateTodo = (req, res, next) => {
  // validation logic
};

// 3. Routes (GET, POST, PUT, DELETE)
router.get('/', (req, res) => {
  // get all
});

router.post('/', validateTodo, (req, res) => {
  // create new
});

router.put('/:id', validateTodo, (req, res) => {
  // update
});

router.delete('/:id', (req, res) => {
  // delete
});

// 4. Export
module.exports = router;
```

## Code Reuse and DRY Principle

### Extract Common Logic

**When to create a utility function:**
- Code is repeated in 2+ places
- Complex logic that's testable independently
- Pure functions with no side effects

**When to create a custom hook (React):**
- State logic used in multiple components
- Effect logic used in multiple components
- Logic that manages lifecycle

**When to create middleware (Express):**
- Logic that applies to multiple routes
- Cross-cutting concerns (auth, logging, error handling)
- Request preprocessing or validation

## Avoiding Common Mistakes

### Anti-patterns to Avoid

❌ **Prop Drilling:**
```jsx
// Avoid passing through multiple levels
<Parent prop={value}>
  <Child prop={prop}>
    <GrandChild prop={prop} />
  </Child>
</Parent>
```
✅ **Solution:** Use Context API or state management

❌ **Everything in One File:**
```jsx
// Avoid 500-line component files
export default function App() {
  // todos logic
  // comments logic
  // users logic
  // all in one file
}
```
✅ **Solution:** Split into smaller, focused components

❌ **API Calls in Components:**
```jsx
// Avoid
export default function TodoList() {
  useEffect(() => {
    fetch('/api/todos').then(r => r.json()).then(setTodos);
  }, []);
}
```
✅ **Solution:** Extract to `api.js`
```javascript
// api.js
export const fetchTodos = () => fetch('/api/todos').then(r => r.json());

// Component
useEffect(() => {
  fetchTodos().then(setTodos);
}, []);
```

❌ **God Objects:**
```javascript
// Avoid large utility files with unrelated functions
// utils/helpers.js contains: formatDate, validateEmail, parseJSON, calculateTotal, etc.
```
✅ **Solution:** Organize utilities by domain
```
utils/
├── formatters.js  // formatDate, formatCurrency
├── validators.js  // validateEmail, validatePhone
└── parsers.js     // parseJSON, parseCSV
```

❌ **Tight Coupling:**
```javascript
// Avoid dependencies on concrete implementations
const handler = (req, res) => {
  const db = new Database();  // Direct dependency
  db.query(...);
};
```
✅ **Solution:** Use dependency injection or centralize setup
```javascript
const handler = (db) => (req, res) => {
  db.query(...);
};
```

## When to Create New Folders/Files

### Create a New Folder When:
- A concept/domain has 2+ related files
- A feature is isolated and reusable
- Code organization becomes unclear without grouping

**Examples:**
- `components/` - Multiple React components
- `features/` - Multiple feature modules
- `utils/` - Multiple utility functions
- `middleware/` - Multiple middleware functions

### Keep in Root When:
- Single file for concept (one route file, one API file, one style file)
- Entry points (index.js, main.jsx, App.jsx)
- Configuration files (package.json, config files)

## Summary Checklist

- ✅ Each file has a single responsibility
- ✅ Components focus on UI rendering
- ✅ API calls centralized in one place
- ✅ Utilities are pure functions when possible
- ✅ Routes are organized by resource/domain
- ✅ Naming is consistent and descriptive
- ✅ No circular dependencies
- ✅ Imports are organized logically
- ✅ Deep nesting is avoided through good structure
