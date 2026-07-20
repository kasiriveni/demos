# Backend Stack Skill

**Description:** Master the Express.js TODO API with comprehensive testing, error handling, and middleware management.

**Use when:**
- Writing new routes (GET, POST, PUT, DELETE)
- Modifying middleware (CORS, response envelope)
- Debugging API issues or 4xx/5xx errors
- Working with the JSON file store (data/todos.json)
- Writing Jest unit tests in `__tests__/`
- Managing dependencies and Express configuration

## Key Stack
- **Framework:** Express.js 5.2.1
- **Testing:** Jest with coverage reports
- **Storage:** JSON file (data/todos.json)
- **Port:** 3000 (default)
- **Key dependencies:** uuid, cors, express

## Key Files
- `backend/index.js` - Server entry point
- `backend/routes/todos.js`, `jokes.js`, `tips.js` - API endpoints
- `backend/__tests__/todos.test.js` - Test suite
- `backend/data/todos.json` - In-memory storage

## Common Tasks

### Create a New Route
```javascript
// In backend/routes/newfeature.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'New endpoint' });
});

module.exports = router;
```

### Add Middleware
```javascript
// In backend/index.js
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  // Custom middleware logic
  next();
});
```

### Write Tests
```javascript
// In backend/__tests__/
describe('Endpoint', () => {
  it('should return data', async () => {
    const res = await request(app).get('/api/endpoint');
    expect(res.status).toBe(200);
  });
});
```

## Scripts
- `npm start` - Production mode
- `npm run dev` - Development with nodemon
- `npm test` - Run Jest suite
- `npm run coverage` - Generate coverage report

## Response Envelope Pattern
All responses follow a standard envelope (check middleware for format).
