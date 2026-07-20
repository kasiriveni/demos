---
description: "Use when designing API responses and handling API contracts. Covers response structure, status codes, error formats, pagination, and consistency."
name: "API Response Standards"
applyTo: "backend/routes/**/*.js"
---

# API Response Standards

## Response Envelope Format

All API responses must follow the standard envelope for consistency and predictability.

### Success Response (2xx)

```javascript
{
  "success": true,
  "data": {
    // Response payload - can be object, array, or primitive
  },
  "error": null
}
```

### Error Response (4xx, 5xx)

```javascript
{
  "success": false,
  "data": null,
  "error": "Human-readable error message describing what went wrong"
}
```

**Never nest data or use different structures.** Always include all three fields.

## HTTP Status Codes

### 2xx - Success

| Code | Use Case | Example |
|------|----------|---------|
| `200` | Successful GET, PUT, PATCH | Fetch todos, update todo |
| `201` | Resource successfully created | POST /todos creates new todo |
| `204` | Success with no content | DELETE /todos/123 |

### 4xx - Client Error

| Code | Use Case | Response |
|------|----------|---------|
| `400` | Bad request (validation error) | Missing field, invalid format |
| `401` | Unauthorized (not authenticated) | Missing/invalid token |
| `403` | Forbidden (authenticated but not authorized) | User can't access resource |
| `404` | Resource not found | Todo ID doesn't exist |
| `409` | Conflict (duplicate, stale data) | Duplicate todo title, optimistic lock fail |
| `422` | Unprocessable entity (semantic error) | Invalid status value for enum |

### 5xx - Server Error

| Code | Use Case | Response |
|------|----------|---------|
| `500` | Unexpected server error | Unhandled exception, database crash |
| `503` | Service unavailable | Database connection failed, dependencies down |

## Response Examples

### GET - Fetch Single Resource

```javascript
// Success
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "error": null
}

// Not Found
{
  "success": false,
  "data": null,
  "error": "Todo with ID '123' not found"
}
```

### GET - Fetch Collection

```javascript
// Success
{
  "success": true,
  "data": [
    {
      "id": "123",
      "title": "Todo 1",
      "completed": false
    },
    {
      "id": "124",
      "title": "Todo 2",
      "completed": true
    }
  ],
  "error": null
}

// Empty collection
{
  "success": true,
  "data": [],
  "error": null
}
```

### POST - Create Resource

```javascript
// Success (201 Created)
{
  "success": true,
  "data": {
    "id": "125",
    "title": "New Todo",
    "completed": false,
    "createdAt": "2024-01-16T14:22:00Z"
  },
  "error": null
}

// Validation Error (400)
{
  "success": false,
  "data": null,
  "error": "Field 'title' is required and must be a non-empty string"
}
```

### PUT - Update Resource

```javascript
// Success
{
  "success": true,
  "data": {
    "id": "123",
    "title": "Updated Todo",
    "completed": true,
    "updatedAt": "2024-01-16T15:00:00Z"
  },
  "error": null
}

// Validation Error
{
  "success": false,
  "data": null,
  "error": "Field 'completed' must be a boolean value"
}
```

### DELETE - Remove Resource

```javascript
// Success (204 No Content) - typically no body
// OR with body (200):
{
  "success": true,
  "data": null,
  "error": null
}

// Not Found
{
  "success": false,
  "data": null,
  "error": "Todo with ID '999' not found"
}
```

## Error Message Guidelines

### Format

Use clear, actionable error messages that guide the user:
```
"[What went wrong] [Why it happened] [What to do next (optional)]"
```

### Examples

| Bad | Good |
|-----|------|
| "Invalid request" | "Field 'title' is required and must be a non-empty string" |
| "Error" | "Todo with ID 'abc123' not found. Check the ID and try again." |
| "Validation failed" | "Field 'completed' must be a boolean (true or false)" |
| "Server error" | "Unable to save todo due to database connection error. Please try again." |

### Validation Error Details

For multiple validation errors, either:

**Option 1: Provide first error only (simpler)**
```javascript
{
  "success": false,
  "data": null,
  "error": "Field 'title' is required"
}
```

**Option 2: Provide all errors (better UX)**
```javascript
{
  "success": false,
  "data": {
    "errors": [
      { "field": "title", "message": "Field 'title' is required" },
      { "field": "completed", "message": "Field 'completed' must be boolean" }
    ]
  },
  "error": "Validation failed. See details in data.errors"
}
```

Choose one approach and stick to it throughout the API.

## Response Headers

### Always Include

```
Content-Type: application/json
```

### Recommended

```
X-Request-ID: <unique-request-id>     # For tracking and debugging
X-Total-Count: <number>                # When returning paginated results
Cache-Control: no-cache                # Prevent caching of dynamic data
```

### Example

```javascript
res.set({
  'Content-Type': 'application/json',
  'X-Request-ID': generateUUID(),
  'X-Total-Count': 42,
});
res.json({ success: true, data: todos, error: null });
```

## Pagination (if applicable)

### Query Parameters

```
GET /api/todos?page=2&limit=20
```

### Response Format

```javascript
{
  "success": true,
  "data": {
    "items": [/* todos */],
    "pagination": {
      "page": 2,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  },
  "error": null
}
```

### Headers

```
X-Total-Count: 150
X-Page: 2
X-Limit: 20
X-Total-Pages: 8
Link: <http://api.example.com/todos?page=3>; rel="next", <http://api.example.com/todos?page=1>; rel="prev"
```

## Null and Empty Handling

### Empty Collections

Return empty array, not null:
```javascript
{
  "success": true,
  "data": [],  // Not null
  "error": null
}
```

### Null Fields

Be explicit about null values:
```javascript
{
  "success": true,
  "data": {
    "id": "123",
    "title": "Todo",
    "description": null,  // Explicitly null, not omitted
    "tags": []            // Empty array, not null
  },
  "error": null
}
```

### Optional Fields

Omit optional fields that are not present (or include with null):
```javascript
// Option 1: Omit optional field
{ "id": "123", "title": "Todo", "dueDate": "2024-01-20" }

// Option 2: Include with null
{ "id": "123", "title": "Todo", "dueDate": "2024-01-20", "priority": null }

Choose one approach and be consistent.
```

## Timestamp Format

Use ISO 8601 format for all timestamps:
```
2024-01-16T14:30:00Z       // UTC
2024-01-16T14:30:00+05:30  // With timezone offset
```

**Recommended: Always use UTC (Z suffix)**

```javascript
new Date().toISOString()  // Returns 2024-01-16T14:30:00.000Z
```

## API Versioning (Future)

If API versioning becomes necessary:

```
GET /api/v1/todos        // Version 1
GET /api/v2/todos        // Version 2
```

Or use custom header:
```
Accept-Version: 1
```

## Rate Limiting Headers

If rate limiting is implemented:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1705418400
```

## Response Size Guidelines

- Keep individual responses under 1MB
- Return only necessary fields (consider adding `?fields=` parameter)
- Use pagination for large collections
- Compress responses (gzip) for production

## Testing Responses

Validate response structure in tests:

```javascript
test('should return proper response envelope', async () => {
  const response = await request(app)
    .get('/api/todos')
    .expect(200);

  // Check envelope structure
  expect(response.body).toHaveProperty('success', true);
  expect(response.body).toHaveProperty('data');
  expect(response.body).toHaveProperty('error', null);

  // Check data structure
  expect(Array.isArray(response.body.data)).toBe(true);
});

test('should return error in proper format', async () => {
  const response = await request(app)
    .get('/api/todos/invalid-id')
    .expect(404);

  expect(response.body.success).toBe(false);
  expect(response.body.data).toBeNull();
  expect(response.body.error).toMatch(/not found/i);
});
```

## Summary Checklist

- ✅ All responses include `success`, `data`, and `error` fields
- ✅ Appropriate HTTP status codes used
- ✅ Error messages are clear and actionable
- ✅ Timestamps in ISO 8601 format
- ✅ Collections are arrays, never null
- ✅ Response is tested for structure
- ✅ Content-Type is application/json
- ✅ No unnecessary nested structures
