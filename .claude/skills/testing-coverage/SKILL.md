# Testing & Coverage Skill

**Description:** Write and maintain comprehensive tests with Jest (backend) and Vitest (agent-website).

**Use when:**
- Adding unit tests for routes or components
- Running test suites and debugging failures
- Checking code coverage reports
- Writing mocks for dependencies
- Fixing flaky tests or CI failures
- Adding integration tests

## Testing Stack

### Backend (Jest)
- **Framework:** Jest
- **Location:** `backend/__tests__/`
- **Coverage:** Available in `backend/coverage/`
- **Test File:** `todos.test.js`

### Agent Website (Vitest)
- **Framework:** Vitest
- **Location:** `agent-website/` (coverage available)
- **Coverage Reports:** `agent-website/coverage/`

## Backend Testing (Jest)

### Run Tests
```bash
cd backend
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm run coverage            # Generate coverage
npm test -- todos.test.js   # Run specific test
```

### Write a Test
```javascript
// backend/__tests__/todos.test.js
const request = require('supertest');
const app = require('../index');

describe('GET /api/todos', () => {
  it('should return empty array initially', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create and return a todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Test Task', completed: false });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Task');
  });
});
```

### Coverage Goals
- Aim for >80% coverage on critical routes
- Focus on error cases and edge cases
- View report: Open `backend/coverage/lcov-report/index.html`

## Agent Website Testing (Vitest)

### Run Tests
```bash
cd agent-website
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test -- src/file # Run specific file
```

### View Coverage
```bash
npm run test
# Check coverage output and open `coverage/` folder
```

### Write a Test
```javascript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../src/module';

describe('myFunction', () => {
  it('should return expected result', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
});
```

## Mocking & Fixtures

### Mock API Calls
```javascript
jest.mock('../api', () => ({
  getTodos: jest.fn(() => Promise.resolve([]))
}));
```

### Mock Files
```javascript
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => '{}')
}));
```

## Continuous Integration
- Tests run on push/PR
- Check coverage reports before merging
- Fix failing tests immediately

## Common Issues
| Issue | Solution |
|-------|----------|
| Tests timeout | Increase Jest timeout: `jest.setTimeout(10000)` |
| Mock not working | Ensure mock is defined before import |
| Coverage wrong | Clear cache: `jest --clearCache` |
| Flaky test | Add explicit waits or fix race conditions |
