---
description: "Use when implementing security practices in backend and frontend code. Covers input validation, authentication readiness, data protection, and vulnerability prevention."
name: "Security Best Practices"
applyTo: "{backend,frontend}/**"
---

# Security Best Practices

## Input Validation & Sanitization

### Backend Input Validation

```javascript
// Always validate on backend (don't trust client validation)
function validateTodo(data) {
  // Check required fields
  if (!data.title || typeof data.title !== 'string') {
    throw new Error("Field 'title' is required and must be a string");
  }

  // Validate string length
  if (data.title.length > 500) {
    throw new Error("Field 'title' must not exceed 500 characters");
  }

  // Trim whitespace
  data.title = data.title.trim();

  // Validate boolean field
  if (data.completed !== undefined && typeof data.completed !== 'boolean') {
    throw new Error("Field 'completed' must be a boolean");
  }

  return data;
}

// Route usage
router.post('/api/todos', (req, res) => {
  try {
    const validatedData = validateTodo(req.body);
    const todo = createTodo(validatedData);
    res.status(201).json({ success: true, data: todo, error: null });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: null,
      error: error.message
    });
  }
});
```

### Prevent SQL Injection

```javascript
// ❌ Bad - vulnerable to SQL injection
const query = `SELECT * FROM todos WHERE id = ${id}`;

// ✅ Good - use parameterized queries
const query = 'SELECT * FROM todos WHERE id = ?';
db.query(query, [id]);

// For this project (JSON store), validate ID format
const isValidUUID = (id) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

function getTodoById(id) {
  if (!isValidUUID(id)) {
    throw new Error('Invalid todo ID format');
  }
  return todos.find(t => t.id === id);
}
```

### Prevent XSS (Cross-Site Scripting)

```javascript
// React automatically escapes JSX content
// ✅ Safe - React escapes this automatically
<div>{userInput}</div>

// ❌ Dangerous - bypasses React's escaping
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Sanitize if necessary
import DOMPurify from 'dompurify';

const sanitized = DOMPurify.sanitize(userInput);
```

### Prevent CSRF (Cross-Site Request Forgery)

```javascript
// Use CSRF tokens (Express middleware available)
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Include token in forms
<form method="POST">
  <input type="hidden" name="_csrf" value={csrfToken} />
  {/* form fields */}
</form>
```

## Authentication & Authorization

### Prepare for Authentication

```javascript
// Currently: No authentication
// Before production, implement JWT or session-based auth

// JWT token verification middleware (template)
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      data: null,
      error: 'Missing authentication token'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      data: null,
      error: 'Invalid or expired token'
    });
  }
};

// Protect routes
router.get('/api/todos', verifyToken, (req, res) => {
  // Only authenticated users can access
  const userTodos = todos.filter(t => t.userId === req.userId);
  res.json({ success: true, data: userTodos, error: null });
});
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

// Create limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                   // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Apply to routes
app.use('/api/', limiter);

// Or specific routes
router.post('/api/todos', limiter, (req, res) => {
  // Handle request
});
```

## Data Protection

### Secrets Management

```javascript
// ❌ Never hardcode secrets
const apiKey = 'sk-abc123xyz';

// ✅ Use environment variables
const apiKey = process.env.API_KEY;

// ✅ Use .env file locally (never commit)
// .env
API_KEY=sk-abc123xyz
JWT_SECRET=your-secret-key-here

// ✅ Load in code
require('dotenv').config();
const apiKey = process.env.API_KEY;
```

### Never Log Sensitive Data

```javascript
// ❌ Bad - logs sensitive information
console.log('User login:', { email, password });

// ✅ Good - only log necessary info
console.log('User login:', { email: user.email });

// ❌ Bad - error includes sensitive data
catch (error) {
  console.error('Error:', error, { token: req.headers.authorization });
}

// ✅ Good - sanitize error logs
catch (error) {
  console.error('Error processing request:', { path: req.path, status: error.statusCode });
}
```

### Secure Password Handling

```javascript
// Current: No passwords (TODO system doesn't require them)
// When authentication is added:

const bcrypt = require('bcrypt');

// ✅ Hash passwords before storing
async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return db.createUser({ email, password: hashedPassword });
}

// ✅ Verify password on login
async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

// ❌ Never store plain text passwords
// ❌ Never use weak hashing (MD5, SHA1)
```

## API Security

### CORS Configuration

```javascript
// Current setup - allow all origins (development only)
const cors = require('cors');
app.use(cors());

// Production: Restrict to specific origins
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### Security Headers

```javascript
const helmet = require('helmet');

// Add security headers
app.use(helmet());

// Or configure manually
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Content Security Policy
  res.setHeader('Content-Security-Policy', "default-src 'self'");

  next();
});
```

### HTTPS/TLS

```javascript
// ✅ Always use HTTPS in production
// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (!req.secure && process.env.NODE_ENV === 'production') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});
```

## Frontend Security

### Protect API Calls

```javascript
// api.js - Always use HTTPS
const API_URL = process.env.VITE_API_URL || 'https://api.example.com';

// Don't expose sensitive data in fetch
export async function fetchTodos() {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'GET',
      credentials: 'include',  // Send cookies
      headers: {
        'Content-Type': 'application/json',
        // Include auth token if needed
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

### Secure Local Storage

```javascript
// ❌ Avoid storing sensitive data in localStorage
localStorage.setItem('password', password); // Never!

// ✅ For tokens, use HttpOnly cookies if possible (set by server)
// Or use sessionStorage for temporary tokens
sessionStorage.setItem('accessToken', token);

// ✅ Clear sensitive data on logout
function logout() {
  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
}
```

### Content Security Policy

```javascript
// In HTML head
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
/>
```

## Dependency Security

### Keep Dependencies Updated

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Review before updating
npm outdated

# Update specific package
npm update package-name
```

### Audit Dependencies

```bash
# Regular audits
npm audit --audit-level=moderate

# Check for specific vulnerabilities
npm audit list
```

### .npmrc for Security

```
# .npmrc
registry=https://registry.npmjs.org/
audit-level=moderate
```

## Secure Development Practices

### Code Review Checklist

Before merging any code:
- [ ] No hardcoded secrets or API keys
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose internals
- [ ] No SQL injection vulnerabilities
- [ ] XSS protection (don't use dangerouslySetInnerHTML)
- [ ] CSRF protection in place
- [ ] Authentication checked for protected routes
- [ ] Rate limiting on sensitive endpoints
- [ ] Logs don't contain sensitive data
- [ ] Dependencies audited for vulnerabilities

### Environment Secrets

```bash
# .env (local development) - NEVER COMMIT
DATABASE_URL=postgresql://localhost/todos
JWT_SECRET=dev-secret-key
API_KEY=dev-api-key

# .env.example (commit this as template)
DATABASE_URL=
JWT_SECRET=
API_KEY=
```

### Secure Commit Practices

```bash
# Configure Git to prevent accidentally committing secrets
git config --global core.sshCommand ssh

# Use git-secrets or similar tools
# Scan for secrets before commit
npm install --save-dev git-secrets
```

## Vulnerability Response

### When Vulnerabilities Are Found

1. **Assess Impact:** How critical is it?
2. **Patch:** Update package to fixed version
3. **Test:** Verify fix doesn't break functionality
4. **Deploy:** Roll out to production
5. **Monitor:** Check for exploitation attempts

```bash
# Patch urgent vulnerabilities
npm audit fix --force

# Run tests after update
npm test

# Verify in staging before production
npm run build
```

## Common Vulnerabilities to Avoid

| Vulnerability | Prevention |
|---|---|
| SQL Injection | Use parameterized queries |
| XSS | Escape HTML, sanitize input |
| CSRF | Use CSRF tokens |
| Weak Auth | Hash passwords, use secure tokens |
| Exposed Secrets | Use environment variables |
| Weak HTTPS | Use TLS 1.2+, strong ciphers |
| Unvalidated Input | Validate all client input |
| Insecure Deserialization | Avoid eval(), use JSON.parse() |
| Missing Logging | Log security events |
| Outdated Dependencies | Regular audits and updates |

## Pre-Production Security Checklist

- ✅ HTTPS/TLS enabled
- ✅ Input validation on all endpoints
- ✅ Authentication implemented
- ✅ Authorization checks in place
- ✅ Rate limiting configured
- ✅ CORS properly configured
- ✅ Security headers set
- ✅ Secrets in environment variables
- ✅ Dependencies audited and updated
- ✅ Error messages don't expose internals
- ✅ Logging doesn't include sensitive data
- ✅ SQL injection prevention in place
- ✅ XSS protection enabled
- ✅ CSRF tokens configured
- ✅ Passwords hashed (if applicable)
- ✅ Cookies set with Secure, HttpOnly, SameSite flags
- ✅ OWASP Top 10 reviewed
