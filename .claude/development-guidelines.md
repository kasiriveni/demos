# Development Guidelines - AI Project

Comprehensive development standards for consistent, maintainable code across the project.

---

## 🎨 Code Style & Formatting

### JavaScript/Node.js

#### Variable Declaration
```javascript
// ✅ Good
const userId = 123;
let count = 0;

// ❌ Bad
var userId = 123;
var user_id = 123;
```

#### Naming Conventions
```javascript
// ✅ Good - Variables and functions
const todoItems = [];
function getTodoById(id) {}
const MAX_RETRIES = 3;

// ❌ Bad
const todoitems = [];
function get_todo_by_id(id) {}
const max_retries = 3;
```

#### Function Structure
```javascript
// ✅ Good - Keep functions focused
function calculateTodoStatus(todo) {
  return todo.completed ? 'Done' : 'Pending';
}

// ❌ Bad - Too complex
function processTodo(todo, user, settings) {
  // 50 lines of mixed logic
}
```

#### Comments
```javascript
// ✅ Good - Explains why, not what
function getActiveTodos(todos) {
  // Filter only incomplete todos to show current work
  return todos.filter(todo => !todo.completed);
}

// ❌ Bad - Obvious comments
function getActiveTodos(todos) {
  // Return active todos
  return todos.filter(todo => !todo.completed);
}
```

### React/JSX

#### Component Structure
```jsx
// ✅ Good
export function TodoList({ todos, onDelete }) {
  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}

// ❌ Bad
const TodoList = (props) => {
  return (
    <ul>
      {props.todos.map(t => <li key={t.id}>{t.title} <button onClick={() => props.onDelete(t.id)}>X</button></li>)}
    </ul>
  );
};
```

#### Props Documentation
```jsx
// ✅ Good
/**
 * Display list of todos
 * @param {Array} todos - Array of todo objects
 * @param {Function} onDelete - Callback when todo deleted
 */
export function TodoList({ todos, onDelete }) {
  // Implementation
}

// ❌ Bad
export function TodoList(props) {
  // No documentation
}
```

#### Hooks Usage
```jsx
// ✅ Good - Proper dependency array
useEffect(() => {
  const subscription = subscribe(userId);
  return () => subscription.unsubscribe();
}, [userId]); // Dependency listed

// ❌ Bad - Missing dependency
useEffect(() => {
  const subscription = subscribe(userId); // ← but userId not in deps
  return () => subscription.unsubscribe();
}, []);
```

#### Tailwind CSS
```jsx
// ✅ Good - Utility classes
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Submit
</button>

// ❌ Bad - Mixed with inline styles
<button style={{ padding: '8px 16px', backgroundColor: '#3B82F6' }}>
  Submit
</button>
```

---

## 🏗️ Backend Standards (Express.js)

### Route Handler Pattern
```javascript
// ✅ Good
router.post('/todos', (req, res) => {
  try {
    const { title, completed } = req.body;

    // Validate
    if (!title || typeof title !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'Title is required and must be a string'
      });
    }

    // Process
    const todo = { id: uuid(), title, completed: false };

    // Respond
    res.status(201).json({
      status: 'success',
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create todo'
    });
  }
});

// ❌ Bad - No validation, inconsistent response
router.post('/todos', (req, res) => {
  const todo = { id: uuid(), ...req.body };
  res.json(todo); // Missing status wrapper
});
```

### Error Handling
```javascript
// ✅ Good - Specific error handling
try {
  const data = await readTodos();
  res.json({ status: 'success', data });
} catch (error) {
  if (error.code === 'ENOENT') {
    return res.status(404).json({
      status: 'error',
      message: 'Todo file not found'
    });
  }
  res.status(500).json({
    status: 'error',
    message: 'Server error'
  });
}

// ❌ Bad - Generic catch-all
try {
  res.json(await readTodos());
} catch (e) {
  res.status(500).json({ error: e.message });
}
```

### Middleware Pattern
```javascript
// ✅ Good - Clear responsibility
const validateTodoId = (req, res, next) => {
  const { id } = req.params;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid todo ID'
    });
  }
  next();
};

router.delete('/todos/:id', validateTodoId, (req, res) => {
  // Implementation
});

// ❌ Bad - Validation logic in route handler
router.delete('/todos/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'Missing ID' });
    return;
  }
  // Implementation
});
```

---

## 🧪 Testing Standards

### Backend (Jest)

#### Test Structure
```javascript
// ✅ Good
describe('TODO API', () => {
  describe('POST /api/todos', () => {
    test('should create a new todo with valid data', () => {
      // Arrange
      const newTodo = { title: 'Learn Jest', completed: false };

      // Act
      const result = createTodo(newTodo);

      // Assert
      expect(result).toHaveProperty('id');
      expect(result.title).toBe('Learn Jest');
    });

    test('should reject todo without title', () => {
      expect(() => createTodo({ completed: false }))
        .toThrow('Title is required');
    });
  });
});

// ❌ Bad
test('it works', () => {
  expect(createTodo({ title: 'Test' })).toBeDefined();
});
```

#### Test Coverage
```javascript
// ✅ Good - All cases covered
describe('getTodoById', () => {
  test('returns todo when found', () => { /* ... */ });
  test('returns null when not found', () => { /* ... */ });
  test('throws error with invalid ID', () => { /* ... */ });
});

// ❌ Bad - Only happy path
test('getTodoById works', () => {
  expect(getTodoById('123')).toEqual(expectedTodo);
});
```

### Frontend (React)

#### Component Testing
```javascript
// ✅ Good
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './TodoList';

describe('TodoList', () => {
  test('renders todos', () => {
    const todos = [{ id: '1', title: 'Test', completed: false }];
    render(<TodoList todos={todos} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('calls onDelete when delete clicked', () => {
    const onDelete = jest.fn();
    render(<TodoList todos={[...]} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalled();
  });
});

// ❌ Bad
test('TodoList renders', () => {
  const component = render(<TodoList todos={[]} />);
  expect(component).toBeDefined();
});
```

---

## 📁 File Organization

### Backend Routes
```
backend/
├── index.js                 # Server setup, middleware
├── routes/
│   ├── todos.js            # POST, GET, PUT, DELETE /todos
│   ├── jokes.js            # GET /jokes
│   └── tips.js             # GET /tips
└── __tests__/
    └── todos.test.js       # Tests for todos routes
```

### Frontend Components
```
frontend/src/
├── main.jsx                # Vite entry
├── App.jsx                 # Main component
├── api.js                  # API client (fetch wrapper)
├── components/
│   ├── Button.jsx
│   ├── Header.jsx
│   ├── TodoList.jsx
│   ├── TodoItem.jsx
│   └── InputForm.jsx
└── styles/
    └── tailwind.css        # Tailwind imports
```

### Agent Website Features
```
agent-website/
├── js/
│   ├── main.js
│   └── features/
│       ├── animations.js
│       ├── content.js
│       ├── navigation.js
│       ├── projects.js
│       └── easter-egg.js
├── assets/css/
│   ├── base.css
│   ├── components.css
│   └── utilities.css
└── __tests__/ (if added)
    └── features.test.js
```

---

## 🔄 API Response Standards

### Success Response
```json
{
  "status": "success",
  "data": {
    "id": "123",
    "title": "Learn API Design",
    "completed": false
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Descriptive error message",
  "code": "VALIDATION_ERROR"
}
```

### List Response
```json
{
  "status": "success",
  "data": [
    { "id": "1", "title": "Todo 1" },
    { "id": "2", "title": "Todo 2" }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "limit": 50
  }
}
```

---

## ✨ Performance Best Practices

### React
```jsx
// ✅ Good - Memoize expensive components
const TodoList = React.memo(function TodoList({ todos, onDelete }) {
  // Expensive rendering
  return todos.map(todo => <TodoItem key={todo.id} {...todo} onDelete={onDelete} />);
});

// ✅ Good - useCallback for callbacks
const handleDelete = useCallback((id) => {
  onDelete(id);
}, [onDelete]);

// ✅ Good - Lazy load components
const AdminPanel = React.lazy(() => import('./AdminPanel'));

// ❌ Bad - Unnecessary re-renders
function TodoList({ todos }) {
  const [timestamp] = useState(Date.now()); // Changes every render
  return todos.map(todo => <TodoItem key={todo.id} timestamp={timestamp} />);
}
```

### Backend
```javascript
// ✅ Good - Efficient queries
const activeTodos = todos.filter(t => !t.completed);

// ✅ Good - Batch operations
router.post('/todos/bulk', (req, res) => {
  const created = req.body.map(item => createTodo(item));
  res.json({ status: 'success', data: created });
});

// ❌ Bad - N+1 queries
router.get('/todos', (req, res) => {
  const todos = getTodos();
  const enriched = todos.map(todo => ({
    ...todo,
    user: getUser(todo.userId) // Query per todo
  }));
  res.json(enriched);
});
```

---

## 🔒 Security Best Practices

### Input Validation
```javascript
// ✅ Good
const validateTodo = (todo) => {
  if (!todo.title || typeof todo.title !== 'string') {
    throw new Error('Title must be a non-empty string');
  }
  if (todo.title.length > 255) {
    throw new Error('Title must be under 255 characters');
  }
  return true;
};

// ❌ Bad - No validation
router.post('/todos', (req, res) => {
  saveTodo(req.body); // Dangerous!
});
```

### CORS Configuration
```javascript
// ✅ Good - Specific origins
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// ❌ Bad - Allow all
app.use(cors({ origin: '*' }));
```

### Environment Variables
```javascript
// ✅ Good
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) throw new Error('Missing ANTHROPIC_API_KEY');

// ❌ Bad
const apiKey = 'sk-1234567890'; // Hardcoded!
```

---

## 📚 Documentation Standards

### JSDoc Comments
```javascript
// ✅ Good
/**
 * Calculate the status of a todo
 * @param {Object} todo - The todo object
 * @param {string} todo.id - Unique identifier
 * @param {boolean} todo.completed - Completion status
 * @returns {string} Either 'Done' or 'Pending'
 * @throws {Error} If todo is invalid
 * @example
 * const status = getTodoStatus({ id: '1', completed: true });
 * // Returns: 'Done'
 */
function getTodoStatus(todo) {
  if (!todo || !todo.id) throw new Error('Invalid todo');
  return todo.completed ? 'Done' : 'Pending';
}

// ❌ Bad - No documentation
function getStatus(t) {
  return t.completed ? 'Done' : 'Pending';
}
```

### README Guidelines
- Include purpose and tech stack
- Provide quick start instructions
- Document main files and their roles
- Include setup and testing commands
- Link to detailed documentation

---

## 🎯 Checklist Before Committing

- [ ] Code passes linting
- [ ] All tests pass (`npm test`)
- [ ] Test coverage meets targets
- [ ] No `console.log()` statements
- [ ] No commented-out code
- [ ] Variables have meaningful names
- [ ] Functions follow naming conventions
- [ ] Comments explain "why", not "what"
- [ ] Proper error handling
- [ ] No hardcoded values
- [ ] DRY principle applied
- [ ] Components are reusable
- [ ] Commit message follows Conventional Commits
- [ ] No sensitive data in commit

---

## 🚀 Code Review Suggestions

When reviewing code, check for:

1. **Readability:** Is the code easy to understand?
2. **Testing:** Is there adequate test coverage?
3. **Performance:** Could it be optimized?
4. **Security:** Are inputs validated?
5. **Consistency:** Does it follow project standards?
6. **Maintainability:** Will future developers understand it?
7. **Documentation:** Is it well-commented?
8. **Error Handling:** Are error cases handled?
9. **Naming:** Are names descriptive?
10. **Structure:** Is code properly organized?

---

**Last Updated:** 2026-07-17

For questions, refer to `instructions.md` or the main project documentation.
