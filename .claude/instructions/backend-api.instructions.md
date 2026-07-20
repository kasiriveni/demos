---
description: "Use when writing or modifying Express.js API routes, middleware, and request handlers. Covers route patterns, error handling, validation, response envelopes, and API consistency."
name: "Backend API Standards"
applyTo: "backend/**/*.js"
---

# Backend API Standards

## Route Handler Patterns

- All route handlers must follow the pattern: extract request data → validate → process → send response.
- Use `req.body`, `req.params`, and `req.query` consistently; validate all inputs before processing.
- Return responses using the standard response envelope: `{ success: boolean, data: any, error: string|null }`.
- Set appropriate HTTP status codes: `200` for success, `201` for created, `400` for bad request, `404` for not found, `500` for server errors.

## Error Handling

- Always wrap async route handlers with error middleware or try-catch blocks.
- Return error responses with a descriptive `error` field and a user-friendly message.
- Include status code and error type (e.g., `ValidationError`, `NotFoundError`) in error responses for client handling.
- Never expose internal stack traces to the client in production mode.
- Log errors server-side with full stack trace for debugging.

## Request Validation

- Validate request data immediately in the route handler before any processing.
- Check for required fields, correct data types, and valid values (e.g., UUID format, positive numbers).
- Return `400 Bad Request` with detailed field-level errors when validation fails.
- Use consistent error messages: `"Field 'fieldName' is required"` or `"Field 'fieldName' must be a number"`.

## Response Envelope

Standard successful response:
```javascript
{
  success: true,
  data: { /* response payload */ },
  error: null
}
```

Standard error response:
```javascript
{
  success: false,
  data: null,
  error: "Human-readable error message"
}
```

- Always include all three fields (success, data, error) for consistency.
- Never nest data inside additional properties; keep the structure flat.

## Middleware Organization

- Place global middleware (CORS, logging, parsing) in `index.js` before route definitions.
- Create dedicated middleware functions in a `middleware/` folder for reusable logic (auth, validation, error handling).
- Order middleware thoughtfully: error-catching should be last, body parsing should be early.
- All middleware should follow the pattern: `(req, res, next) => { /* logic */ next() }`.

## API Consistency

- Use consistent naming: plural nouns for collections (`/api/todos`), singular for operations (`/api/todos/:id`).
- HTTP methods follow REST conventions: GET (read), POST (create), PUT (update), DELETE (remove).
- Always include an `id` field in resource responses for client-side reference.
- Use `uuid` or similar unique identifier libraries; never use sequential IDs that expose data size or patterns.

## CORS and Security Headers

- CORS should be configured at the app level with explicit allowed origins.
- Include security headers: `Content-Type: application/json`, `X-Content-Type-Options: nosniff`.
- Validate request origin for sensitive operations; block unauthorized domains.

## Logging and Debugging

- Log incoming requests (method, path, status) at info level in development.
- Log errors with full context: timestamp, request ID, error message, and stack trace.
- Use structured logging format for easier parsing: timestamp, level, message, context.
- Avoid logging sensitive data (passwords, tokens, personal information).

## Testing Routes

- Write tests for both success and error paths for each route.
- Mock dependencies (database, external APIs) in tests; don't hit real services.
- Test edge cases: empty inputs, missing fields, invalid formats, boundary values.
- Ensure each test is isolated and doesn't depend on test execution order.
