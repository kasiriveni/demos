---
description: "Use when writing or updating Jest test files for Express backend. Covers test patterns, mocking, async testing, and coverage expectations."
name: "Jest Testing Standards"
applyTo: "backend/__tests__/**/*.test.js"
---

# Jest Testing Standards

## Test File Organization

- Test files mirror the structure of the source code being tested
- One test file per source file: `routes/todos.js` → `__tests__/todos.test.js`
- Use `describe()` blocks to group related tests
- Use clear, descriptive test names that explain what's being tested

**Structure:**
```javascript
describe('todos route', () => {
  describe('GET /api/todos', () => {
    test('should return all todos', () => {
      // test body
    });

    test('should return empty array when no todos exist', () => {
      // test body
    });
  });

  describe('POST /api/todos', () => {
    test('should create a new todo', () => {
      // test body
    });

    test('should return 400 for missing title', () => {
      // test body
    });
  });
});
```

## Test Naming Convention

Use `test()` or `it()` (equivalent); follow pattern:
```javascript
test('should [expected behavior] when [condition]', () => {
  // assertions
});
```

**Examples:**
```javascript
test('should return 200 when todo exists', () => {});
test('should delete a todo and return 204', () => {});
test('should return validation error when title is empty', () => {});
test('should handle concurrent requests without data loss', () => {});
```

## Test Structure: Arrange-Act-Assert (AAA)

Every test should follow three phases:

```javascript
test('should update a todo', () => {
  // Arrange: Set up test data and mocks
  const todoId = 'todo-123';
  const updatedData = { completed: true };

  // Act: Execute the code being tested
  const result = updateTodo(todoId, updatedData);

  // Assert: Verify the result
  expect(result.completed).toBe(true);
  expect(result.id).toBe(todoId);
});
```

## Setup and Teardown

Use `beforeEach()` and `afterEach()` for test isolation:

```javascript
describe('todos route', () => {
  let mockDb;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockDb = createMockDatabase();
  });

  afterEach(() => {
    // Clean up after each test
    jest.restoreAllMocks();
  });

  test('test 1', () => {});
  test('test 2', () => {});
});
```

## Mocking Best Practices

### Mock External Dependencies

```javascript
// Don't make real HTTP requests or database calls
jest.mock('node-fetch'); // Mock external API calls
jest.mock('fs'); // Mock file system

// Or mock at route level
jest.mock('../data/todoStore');
```

### Mock Functions

```javascript
// Create a mock function
const mockFetch = jest.fn();

// Configure return value
mockFetch.mockResolvedValue({ status: 200, json: () => ({ id: '123' }) });

// Or mock rejected promise
mockFetch.mockRejectedValue(new Error('Network error'));

// Assert it was called
expect(mockFetch).toHaveBeenCalled();
expect(mockFetch).toHaveBeenCalledWith('/api/todos');
expect(mockFetch).toHaveBeenCalledTimes(1);
```

### Mock Modules

```javascript
// Mock entire module
jest.mock('../routes/todos', () => ({
  getTodo: jest.fn(),
  createTodo: jest.fn(),
}));

// Import and use the mock
const { getTodo } = require('../routes/todos');
getTodo.mockResolvedValue({ id: '123', title: 'Test' });
```

## Testing Express Routes

### Testing GET Requests

```javascript
test('should return all todos', async () => {
  // Mock data
  const mockTodos = [
    { id: '1', title: 'Todo 1', completed: false },
    { id: '2', title: 'Todo 2', completed: true },
  ];

  // Make request (using supertest or similar)
  const response = await request(app)
    .get('/api/todos')
    .expect(200);

  // Assert response
  expect(response.body.success).toBe(true);
  expect(response.body.data).toEqual(mockTodos);
});
```

### Testing POST Requests

```javascript
test('should create a new todo', async () => {
  const newTodo = { title: 'New Task', completed: false };

  const response = await request(app)
    .post('/api/todos')
    .send(newTodo)
    .expect(201);

  expect(response.body.success).toBe(true);
  expect(response.body.data.id).toBeDefined();
  expect(response.body.data.title).toBe('New Task');
});
```

### Testing Error Cases

```javascript
test('should return 400 when title is missing', async () => {
  const response = await request(app)
    .post('/api/todos')
    .send({ completed: false })
    .expect(400);

  expect(response.body.success).toBe(false);
  expect(response.body.error).toContain('title');
});

test('should return 404 when todo not found', async () => {
  const response = await request(app)
    .get('/api/todos/nonexistent-id')
    .expect(404);

  expect(response.body.success).toBe(false);
});
```

### Testing PUT Requests

```javascript
test('should update a todo', async () => {
  const updates = { completed: true };

  const response = await request(app)
    .put('/api/todos/todo-123')
    .send(updates)
    .expect(200);

  expect(response.body.success).toBe(true);
  expect(response.body.data.completed).toBe(true);
});
```

### Testing DELETE Requests

```javascript
test('should delete a todo', async () => {
  const response = await request(app)
    .delete('/api/todos/todo-123')
    .expect(204);

  // 204 No Content typically has no body
  expect(response.body).toEqual({});
});
```

## Testing Async Operations

```javascript
test('should handle async operations', async () => {
  // Use async/await
  const result = await asyncFunction();
  expect(result).toBe(expectedValue);
});

test('should wait for promises', () => {
  // Return promise to jest
  return asyncFunction().then(result => {
    expect(result).toBe(expectedValue);
  });
});

test('should timeout on slow operations', async () => {
  // Increase timeout for slow tests
  jest.setTimeout(10000);
  const result = await slowFunction();
  expect(result).toBeDefined();
});
```

## Testing Error Handling

```javascript
test('should catch and handle errors', async () => {
  const mockError = new Error('Database connection failed');
  mockFunction.mockRejectedValue(mockError);

  const response = await request(app)
    .get('/api/todos')
    .expect(500);

  expect(response.body.success).toBe(false);
  expect(response.body.error).toContain('connection');
});

test('should retry on transient errors', async () => {
  // Mock to fail twice, then succeed
  mockFunction
    .mockRejectedValueOnce(new Error('Timeout'))
    .mockRejectedValueOnce(new Error('Timeout'))
    .mockResolvedValueOnce({ success: true });

  const result = await retryFunction();
  expect(result.success).toBe(true);
  expect(mockFunction).toHaveBeenCalledTimes(3);
});
```

## Coverage Expectations

Maintain **minimum 80% coverage** for:
- Lines of code
- Functions
- Branches
- Statements

```javascript
// Check coverage
npm run coverage

// View coverage report
open coverage/lcov-report/index.html
```

**Coverage targets by file type:**
- Route handlers: 100% (all paths should be tested)
- Middleware: 90% (cover success and error paths)
- Utilities: 85% (pure functions are easier to test)
- Integration tests: Document why certain paths can't be tested

## Common Assertions

```javascript
// Equality
expect(value).toBe(5);
expect(value).toEqual({ id: 1 });
expect(value).toStrictEqual({ id: 1 }); // Stricter than toEqual

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeDefined();
expect(value).toBeNull();

// Numbers
expect(value).toBeGreaterThan(5);
expect(value).toBeLessThan(10);
expect(value).toBeCloseTo(3.14159, 5); // 5 decimal places

// Strings
expect(message).toMatch(/error/);
expect(message).toContain('error');

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);
expect(array).toEqual(expect.arrayContaining([item1, item2]));

// Objects
expect(obj).toHaveProperty('name');
expect(obj).toMatchObject({ name: 'John' });

// Functions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg1');
expect(mockFn).toHaveBeenCalledTimes(3);
```

## Test Isolation and No Globals

- Each test should run independently
- Don't rely on test execution order
- Clean up mocks and state between tests
- Avoid sharing state across test files

```javascript
// Good: Each test is independent
describe('todos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTodos.length = 0; // Reset
  });

  test('test 1', () => {});
  test('test 2', () => {}); // Doesn't depend on test 1
});
```

## Snapshot Testing (Use Sparingly)

```javascript
// Good for: API response schemas, complex objects
test('should return todo with correct structure', () => {
  const todo = { id: '123', title: 'Test', completed: false };
  expect(todo).toMatchSnapshot();
});

// Don't use for: Data that changes frequently, dynamic values (timestamps)
```

## Performance Testing

```javascript
test('should handle 1000 todos without timeout', async () => {
  const todos = Array.from({ length: 1000 }, (_, i) => ({
    id: `${i}`,
    title: `Todo ${i}`,
  }));

  const start = Date.now();
  const response = await request(app)
    .post('/api/todos/bulk')
    .send({ todos });
  const duration = Date.now() - start;

  expect(response.status).toBe(201);
  expect(duration).toBeLessThan(1000); // Under 1 second
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test todos.test.js

# Run in watch mode (rerun on file changes)
npm test -- --watch

# Run with coverage report
npm run coverage

# Update snapshots
npm test -- -u
```

## Debugging Tests

```javascript
// Add console output for debugging
console.log('Debug value:', value);

// Use test.only to run single test
test.only('debug this test', () => {});

// Use test.skip to skip a test
test.skip('skip this test', () => {});

// Increase timeout for debugging
jest.setTimeout(30000);
```
