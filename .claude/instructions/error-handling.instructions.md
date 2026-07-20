---
description: "Use when implementing error handling, logging, and debugging strategies. Covers error types, logging levels, debugging techniques, and error recovery."
name: "Error Handling & Logging"
applyTo: "{backend,frontend,agent-website}/**"
---

# Error Handling & Logging

## Error Handling Strategy

### Backend Error Handling

#### Try-Catch for Async Operations

```javascript
// Route handler with try-catch
router.post('/api/todos', async (req, res) => {
  try {
    // Validate input
    if (!req.body.title) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "Field 'title' is required"
      });
    }

    // Process request
    const todo = await createTodo(req.body);

    // Return success
    res.status(201).json({
      success: true,
      data: todo,
      error: null
    });
  } catch (error) {
    // Log error with full context
    console.error('Error creating todo:', {
      timestamp: new Date().toISOString(),
      endpoint: '/api/todos',
      method: 'POST',
      error: error.message,
      stack: error.stack
    });

    // Return error to client (don't expose stack trace)
    res.status(500).json({
      success: false,
      data: null,
      error: 'Unable to create todo. Please try again later.'
    });
  }
});
```

#### Global Error Middleware

```javascript
// Express error middleware (add at end, after all routes)
app.use((err, req, res, next) => {
  // Log error
  console.error('Unhandled Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    statusCode: err.statusCode || 500
  });

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Return error response
  res.status(statusCode).json({
    success: false,
    data: null,
    error: err.message || 'Internal server error'
  });
});
```

### Frontend Error Handling

#### API Call Error Handling

```javascript
// api.js
export async function fetchTodos() {
  try {
    const response = await fetch('/api/todos');

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch todos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error.message);
    throw error; // Re-throw for component handling
  }
}

// Component
export default function TodoList() {
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos()
      .then(data => {
        setTodos(data.data); // Extract from response envelope
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        console.error('Failed to load todos:', err);
      });
  }, []);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return <div>{/* render todos */}</div>;
}
```

#### Error Boundary (React)

```javascript
// ErrorBoundary.jsx
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to error tracking service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## Logging Standards

### Logging Levels

| Level | Severity | Use Case | Example |
|-------|----------|----------|---------|
| `DEBUG` | Low | Development, detailed trace | "Fetching todos with filter: {status: 'active'}" |
| `INFO` | Low | Informational events | "Server started on port 3000" |
| `WARN` | Medium | Unexpected but handled | "Deprecated API endpoint called" |
| `ERROR` | High | Error that affects operation | "Database connection failed" |
| `FATAL` | Critical | Application crash imminent | "Out of memory, shutting down" |

### Backend Logging

```javascript
// Production-ready logging function
function logEvent(level, message, context = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context
  };

  if (level === 'ERROR' || level === 'FATAL') {
    console.error(JSON.stringify(logEntry));
  } else if (level === 'WARN') {
    console.warn(JSON.stringify(logEntry));
  } else {
    console.log(JSON.stringify(logEntry));
  }
}

// Usage in routes
router.get('/api/todos', async (req, res) => {
  logEvent('INFO', 'Fetching todos', {
    endpoint: '/api/todos',
    method: 'GET',
    query: req.query
  });

  try {
    const todos = await getTodos();
    res.json({ success: true, data: todos, error: null });
  } catch (error) {
    logEvent('ERROR', 'Failed to fetch todos', {
      endpoint: '/api/todos',
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      data: null,
      error: 'Unable to fetch todos'
    });
  }
});
```

### Frontend Logging

```javascript
// Development: Log to console
if (process.env.NODE_ENV === 'development') {
  console.log('Detailed info for debugging');
}

// Production: Log to error tracking service
function logError(error, context = {}) {
  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service (e.g., Sentry, LogRocket)
    fetch('/api/logs/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        ...context
      })
    }).catch(err => console.error('Failed to log error:', err));
  } else {
    console.error(error);
  }
}
```

## Error Types and Handling

### Validation Errors (400)

```javascript
// Input validation
function validateTodo(data) {
  const errors = [];

  if (!data.title || typeof data.title !== 'string') {
    errors.push("Field 'title' must be a non-empty string");
  }

  if (data.title.length > 500) {
    errors.push("Field 'title' must be under 500 characters");
  }

  if (typeof data.completed !== 'boolean') {
    errors.push("Field 'completed' must be a boolean");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Route usage
router.post('/api/todos', (req, res) => {
  const { isValid, errors } = validateTodo(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      data: null,
      error: errors.join('; ')
    });
  }

  // Process...
});
```

### Not Found Errors (404)

```javascript
router.get('/api/todos/:id', async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        data: null,
        error: `Todo with ID '${req.params.id}' not found`
      });
    }

    res.json({ success: true, data: todo, error: null });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      success: false,
      data: null,
      error: 'Unable to fetch todo'
    });
  }
});
```

### Conflict Errors (409)

```javascript
router.post('/api/todos', async (req, res) => {
  try {
    // Check for duplicates
    const existing = await getTodoByTitle(req.body.title);

    if (existing) {
      return res.status(409).json({
        success: false,
        data: null,
        error: `Todo with title '${req.body.title}' already exists`
      });
    }

    const todo = await createTodo(req.body);
    res.status(201).json({ success: true, data: todo, error: null });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      error: 'Unable to create todo'
    });
  }
});
```

### Unexpected Errors (500)

```javascript
// Always catch and log
async function processRequest(req, res) {
  try {
    // Process...
  } catch (error) {
    // Log full error details
    console.error('Unexpected error:', {
      message: error.message,
      stack: error.stack,
      request: {
        method: req.method,
        path: req.path,
        body: req.body
      }
    });

    // Return generic error to client
    res.status(500).json({
      success: false,
      data: null,
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
}
```

## Debugging Techniques

### Backend Debugging

```javascript
// 1. Use console logging with context
console.log('TODO STATE:', { todos, filter, count: todos.length });

// 2. Use structured logging
const debug = (label, data) => {
  if (process.env.DEBUG) {
    console.log(`[${label}]`, JSON.stringify(data, null, 2));
  }
};

debug('TODOS_FETCHED', todos);

// 3. Use breakpoints in Node.js
node --inspect index.js
// Then open chrome://inspect

// 4. Add request ID for tracing
const requestId = generateUUID();
console.log(`[${requestId}] Processing request`);
```

### Frontend Debugging

```javascript
// 1. React DevTools browser extension
// - Inspect component hierarchy
// - Modify state and props

// 2. Console logging with groups
console.group('Todo Creation');
console.log('Payload:', todoData);
console.log('Response:', response);
console.groupEnd();

// 3. Performance monitoring
performance.mark('todo-creation-start');
await createTodo(todoData);
performance.mark('todo-creation-end');
performance.measure('todo-creation', 'todo-creation-start', 'todo-creation-end');

// 4. Network tab in DevTools
// - Check API requests and responses
// - Verify headers and status codes
```

## Error Recovery

### Retry Logic

```javascript
async function retryRequest(fn, maxRetries = 3, delayMs = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      console.warn(`Attempt ${i + 1} failed, retrying in ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

// Usage
const todos = await retryRequest(() => fetchTodos(), 3, 1000);
```

### Graceful Degradation

```javascript
// Frontend: Show cached data if API fails
const [todos, setTodos] = useState(() => {
  // Try to load from cache
  const cached = localStorage.getItem('todos_cache');
  return cached ? JSON.parse(cached) : [];
});

useEffect(() => {
  fetchTodos()
    .then(data => {
      setTodos(data.data);
      // Update cache
      localStorage.setItem('todos_cache', JSON.stringify(data.data));
    })
    .catch(err => {
      console.warn('Failed to fetch, using cached data:', err);
      // Todos remain as cached value
    });
}, []);
```

## Summary Checklist

- ✅ All errors are caught and handled gracefully
- ✅ Error messages are clear and user-friendly
- ✅ Stack traces never exposed to clients
- ✅ Errors logged with full context
- ✅ Logging uses consistent format and levels
- ✅ Sensitive data (passwords, tokens) not logged
- ✅ Frontend has error boundaries
- ✅ API calls handle network failures
- ✅ Retry logic for transient failures
- ✅ Production errors tracked separately from development
