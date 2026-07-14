// Legacy example data and modal behavior.
const logPerformance = () => {
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`Page Load Time: ${loadTime}ms`);
  }
};

// Agent Examples Data
const agentExamples = {
  react: {
    title: "React Agent Examples",
    description:
      "Build modern React applications with component-driven architecture",
    examples: [
      {
        title: "Functional Component with Hooks",
        code: `import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default UserProfile;`,
      },
      {
        title: "Custom Hook Example",
        code: `import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};`,
      },
      {
        title: "Context API Pattern",
        code: `import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);`,
      },
    ],
  },
  python: {
    title: "Python Agent Examples",
    description: "Build robust Python applications with best practices",
    examples: [
      {
        title: "Flask REST API",
        code: `from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True)

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': u.id,
        'name': u.name,
        'email': u.email
    } for u in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(name=data['name'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id}), 201

if __name__ == '__main__':
    app.run(debug=True)`,
      },
      {
        title: "Data Processing with Pandas",
        code: `import pandas as pd
import numpy as np

# Load and clean data
df = pd.read_csv('data.csv')

# Handle missing values
df = df.fillna(df.mean())

# Feature engineering
df['date'] = pd.to_datetime(df['date'])
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month

# Group and aggregate
summary = df.groupby('category').agg({
    'sales': ['sum', 'mean', 'count'],
    'profit': 'sum'
}).round(2)

# Export results
summary.to_csv('summary.csv')
print(summary)`,
      },
      {
        title: "Async Web Scraper",
        code: `import asyncio
import aiohttp
from bs4 import BeautifulSoup

async def fetch_page(session, url):
    async with session.get(url) as response:
        return await response.text()

async def scrape_urls(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_page(session, url) for url in urls]
        pages = await asyncio.gather(*tasks)

        results = []
        for html in pages:
            soup = BeautifulSoup(html, 'html.parser')
            title = soup.find('h1').text
            results.append(title)

        return results

# Usage
urls = ['https://example.com/page1', 'https://example.com/page2']
results = asyncio.run(scrape_urls(urls))`,
      },
    ],
  },
  devops: {
    title: "DevOps Agent Examples",
    description: "Automate deployment and infrastructure management",
    examples: [
      {
        title: "Docker Compose Setup",
        code: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://db:5432/myapp
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs

  db:
    image: postgres:14
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`,
      },
      {
        title: "Kubernetes Deployment",
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer`,
      },
      {
        title: "CI/CD Pipeline (GitHub Actions)",
        code: `name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linting
        run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to production
        env:
          DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}
        run: |
          ./deploy.sh production`,
      },
    ],
  },
  database: {
    title: "Database Agent Examples",
    description: "Optimize queries and manage database schemas",
    examples: [
      {
        title: "Complex SQL Query with Joins",
        code: `SELECT
    u.id,
    u.name,
    u.email,
    COUNT(DISTINCT o.id) as total_orders,
    SUM(o.total) as total_spent,
    AVG(o.total) as avg_order_value,
    MAX(o.created_at) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE u.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
    AND u.is_active = true
GROUP BY u.id, u.name, u.email
HAVING total_orders > 0
ORDER BY total_spent DESC
LIMIT 100;`,
      },
      {
        title: "Database Migration (Sequelize)",
        code: `'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addIndex('products', ['category_id']);
    await queryInterface.addIndex('products', ['price']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};`,
      },
      {
        title: "MongoDB Aggregation Pipeline",
        code: `db.orders.aggregate([
  // Match orders from last 30 days
  {
    $match: {
      created_at: {
        $gte: new Date(Date.now() - 30*24*60*60*1000)
      }
    }
  },

  // Join with users collection
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
    }
  },

  // Unwind user array
  { $unwind: "$user" },

  // Group by user and calculate metrics
  {
    $group: {
      _id: "$user._id",
      name: { $first: "$user.name" },
      email: { $first: "$user.email" },
      order_count: { $sum: 1 },
      total_spent: { $sum: "$total" },
      avg_order: { $avg: "$total" }
    }
  },

  // Sort by total spent
  { $sort: { total_spent: -1 } },

  // Limit results
  { $limit: 10 }
]);`,
      },
    ],
  },
  "code-review": {
    title: "Code Review Agent Examples",
    description: "Automated code review and quality checks",
    examples: [
      {
        title: "ESLint Configuration",
        code: `module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import'
  ],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal'],
      'newlines-between': 'always'
    }]
  }
};`,
      },
      {
        title: "Pre-commit Hook (Husky)",
        code: `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Run linter
echo "📝 Linting..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Please fix errors before committing."
  exit 1
fi

# Run tests
echo "🧪 Running tests..."
npm test -- --watchAll=false
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Please fix before committing."
  exit 1
fi

# Check formatting
echo "✨ Checking formatting..."
npm run format:check
if [ $? -ne 0 ]; then
  echo "❌ Code formatting issues. Run 'npm run format' to fix."
  exit 1
fi

echo "✅ All pre-commit checks passed!"`,
      },
      {
        title: "SonarQube Quality Gate",
        code: `# sonar-project.properties

sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0

# Source code settings
sonar.sources=src
sonar.tests=src/__tests__
sonar.sourceEncoding=UTF-8

# Code coverage
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# Quality gate conditions
sonar.qualitygate.wait=true

# Exclusions
sonar.exclusions=**/*.test.js,**/*.spec.js,**/node_modules/**,**/dist/**

# Code smell thresholds
sonar.issue.ignore.multicriteria=e1,e2

# Ignore TODO comments
sonar.issue.ignore.multicriteria.e1.ruleKey=javascript:S1135
sonar.issue.ignore.multicriteria.e1.resourceKey=**/*.js

# Coverage requirements
sonar.coverage.exclusions=**/*.test.js,**/*.config.js`,
      },
    ],
  },
  test: {
    title: "Test Automation Examples",
    description: "Automated testing strategies and frameworks",
    examples: [
      {
        title: "Jest Unit Test",
        code: `import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('renders login form with email and password fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows validation error for invalid email', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  test('calls onSubmit with form data when valid', async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});`,
      },
      {
        title: "Cypress E2E Test",
        code: `describe('User Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('allows user to login with valid credentials', () => {
    cy.get('[data-testid="email-input"]')
      .type('user@example.com');

    cy.get('[data-testid="password-input"]')
      .type('SecurePassword123');

    cy.get('[data-testid="login-button"]')
      .click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="welcome-message"]')
      .should('contain', 'Welcome back');
  });

  it('displays error for invalid credentials', () => {
    cy.get('[data-testid="email-input"]')
      .type('wrong@example.com');

    cy.get('[data-testid="password-input"]')
      .type('wrongpassword');

    cy.get('[data-testid="login-button"]')
      .click();

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('redirects to forgot password page', () => {
    cy.get('[data-testid="forgot-password-link"]')
      .click();

    cy.url().should('include', '/forgot-password');
  });
});`,
      },
      {
        title: "Playwright API Testing",
        code: `import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  const API_URL = 'https://api.example.com';

  test('GET /users returns user list', async ({ request }) => {
    const response = await request.get(\`\${API_URL}/users\`);

    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('email');
  });

  test('POST /users creates new user', async ({ request }) => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secure123'
    };

    const response = await request.post(\`\${API_URL}/users\`, {
      data: newUser
    });

    expect(response.status()).toBe(201);

    const created = await response.json();
    expect(created).toHaveProperty('id');
    expect(created.email).toBe(newUser.email);
  });

  test('PUT /users/:id updates user', async ({ request }) => {
    const userId = 1;
    const updates = {
      name: 'Jane Doe Updated'
    };

    const response = await request.put(\`\${API_URL}/users/\${userId}\`, {
      data: updates
    });

    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.name).toBe(updates.name);
  });
});`,
      },
    ],
  },
  documentation: {
    title: "Documentation Agent Examples",
    description: "Auto-generate comprehensive documentation",
    examples: [
      {
        title: "JSDoc Documentation",
        code: `/**
 * Fetches user data from the API
 * @async
 * @param {number} userId - The ID of the user to fetch
 * @param {Object} options - Additional options
 * @param {boolean} options.includeOrders - Include user's orders
 * @param {boolean} options.includeProfile - Include user's profile
 * @returns {Promise<User>} The user object
 * @throws {Error} When user is not found or API request fails
 *
 * @example
 * const user = await fetchUser(123, {
 *   includeOrders: true,
 *   includeProfile: false
 * });
 * console.log(user.name);
 */
async function fetchUser(userId, options = {}) {
  const { includeOrders = false, includeProfile = false } = options;

  try {
    const response = await fetch(\`/api/users/\${userId}\`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(\`User not found: \${userId}\`);
    }

    const user = await response.json();

    if (includeOrders) {
      user.orders = await fetchUserOrders(userId);
    }

    if (includeProfile) {
      user.profile = await fetchUserProfile(userId);
    }

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}`,
      },
      {
        title: "README Template",
        code: `# Project Name

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Description

A brief description of your project, what it does, and why it exists.

## Features

- ✨ Feature 1: Description
- 🚀 Feature 2: Description
- 🎯 Feature 3: Description
- 🔒 Feature 4: Description

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/username/project.git

# Navigate to directory
cd project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
\`\`\`

## Usage

\`\`\`javascript
import { MyLibrary } from 'my-library';

const instance = new MyLibrary({
  apiKey: 'your-api-key',
  debug: true
});

const result = await instance.doSomething();
console.log(result);
\`\`\`

## API Reference

### \`MyLibrary.doSomething(params)\`

Description of what this method does.

**Parameters:**
- \`param1\` (string): Description
- \`param2\` (number, optional): Description

**Returns:** Promise<Result>

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@twitter](https://twitter.com/username) - email@example.com

Project Link: [https://github.com/username/project](https://github.com/username/project)`,
      },
      {
        title: "API Documentation (OpenAPI/Swagger)",
        code: `openapi: 3.0.0
info:
  title: User API
  description: API for managing users
  version: 1.0.0
  contact:
    name: API Support
    email: support@example.com

servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server

paths:
  /users:
    get:
      summary: Get all users
      description: Returns a list of all users
      tags:
        - Users
      parameters:
        - name: page
          in: query
          description: Page number
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          description: Items per page
          schema:
            type: integer
            default: 10
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  pagination:
                    $ref: '#/components/schemas/Pagination'

    post:
      summary: Create a new user
      tags:
        - Users
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUser'
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
        created_at:
          type: string
          format: date-time

    CreateUser:
      type: object
      required:
        - name
        - email
      properties:
        name:
          type: string
        email:
          type: string
        password:
          type: string`,
      },
    ],
  },
};

// Skill Examples Data
const skillExamples = {
  "rest-api": {
    title: "Generate REST API Examples",
    description:
      "Scaffold complete RESTful APIs with best practices and modern patterns",
    examples: [
      {
        title: "Express.js REST API",
        code: `const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// User model (Mongoose example)
const User = require('./models/User');

// GET /api/users - List all users
app.get('/api/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;

    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ [sort]: -1 })
      .select('-password');

    const count = await User.countDocuments();

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/users - Create new user
app.post('/api/users',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('name').trim().notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = new User(req.body);
      await user.save();

      res.status(201).json({
        id: user._id,
        email: user.email,
        name: user.name
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// GET /api/users/:id - Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/users/:id - Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/users/:id - Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,
      },
      {
        title: "FastAPI REST API (Python)",
        code: `from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

app = FastAPI(title="User API", version="1.0.0")

# Pydantic models
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None

# In-memory database (replace with actual DB)
users_db = []
user_id_counter = 1

@app.get("/api/users", response_model=List[UserResponse])
async def get_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    """Get all users with pagination"""
    return users_db[skip : skip + limit]

@app.post("/api/users", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate):
    """Create a new user"""
    global user_id_counter

    # Check if email already exists
    if any(u['email'] == user.email for u in users_db):
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = {
        "id": user_id_counter,
        "email": user.email,
        "name": user.name,
        "created_at": datetime.now()
    }

    users_db.append(new_user)
    user_id_counter += 1

    return new_user

@app.get("/api/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    """Get a specific user by ID"""
    user = next((u for u in users_db if u['id'] == user_id), None)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

@app.put("/api/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user_update: UserUpdate):
    """Update a user"""
    user = next((u for u in users_db if u['id'] == user_id), None)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user_update.email:
        user['email'] = user_update.email
    if user_update.name:
        user['name'] = user_update.name

    return user

@app.delete("/api/users/{user_id}", status_code=204)
async def delete_user(user_id: int):
    """Delete a user"""
    global users_db

    user_index = next((i for i, u in enumerate(users_db) if u['id'] == user_id), None)

    if user_index is None:
        raise HTTPException(status_code=404, detail="User not found")

    users_db.pop(user_index)
    return None`,
      },
      {
        title: "GraphQL API Schema",
        code: `const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

// Type Definitions
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (parent) => getPostsByUserId(parent.id)
    }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    published: { type: GraphQLBoolean },
    author: {
      type: UserType,
      resolve: (parent) => getUserById(parent.authorId)
    }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: (parent, args) => getUserById(args.id)
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 10 },
        offset: { type: GraphQLInt, defaultValue: 0 }
      },
      resolve: (parent, args) => getAllUsers(args.limit, args.offset)
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: (parent, args) => getPostById(args.id)
    }
  }
});

// Mutations
const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => createUser(args)
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve: (parent, args) => updateUser(args.id, args)
    },
    deleteUser: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => deleteUser(args.id)
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});`,
      },
    ],
  },
  "unit-tests": {
    title: "Generate Unit Tests Examples",
    description:
      "Create comprehensive automated test suites with high coverage",
    examples: [
      {
        title: "Jest Test Suite",
        code: `import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserProfile from './UserProfile';

// Mock API server
const server = setupServer(
  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(ctx.json({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Software developer'
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserProfile Component', () => {
  describe('Rendering', () => {
    test('should display loading state initially', () => {
      render(<UserProfile userId={1} />);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('should render user data after loading', async () => {
      render(<UserProfile userId={1} />);

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Software developer')).toBeInTheDocument();
    });

    test('should display error message on API failure', async () => {
      server.use(
        rest.get('/api/users/:id', (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      render(<UserProfile userId={1} />);

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    test('should open edit modal on edit button click', async () => {
      render(<UserProfile userId={1} />);

      await waitFor(() => screen.getByText('John Doe'));

      const editButton = screen.getByRole('button', { name: /edit/i });
      fireEvent.click(editButton);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('should update user data on form submission', async () => {
      const user = userEvent.setup();
      render(<UserProfile userId={1} />);

      await waitFor(() => screen.getByText('John Doe'));

      const editButton = screen.getByRole('button', { name: /edit/i });
      await user.click(editButton);

      const nameInput = screen.getByLabelText(/name/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Jane Doe');

      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    test('should handle missing user data gracefully', async () => {
      server.use(
        rest.get('/api/users/:id', (req, res, ctx) => {
          return res(ctx.status(404));
        })
      );

      render(<UserProfile userId={999} />);

      await waitFor(() => {
        expect(screen.getByText(/user not found/i)).toBeInTheDocument();
      });
    });

    test('should prevent duplicate API calls', async () => {
      let callCount = 0;

      server.use(
        rest.get('/api/users/:id', (req, res, ctx) => {
          callCount++;
          return res(ctx.json({ id: 1, name: 'John' }));
        })
      );

      const { rerender } = render(<UserProfile userId={1} />);
      rerender(<UserProfile userId={1} />);

      await waitFor(() => screen.getByText('John'));
      expect(callCount).toBe(1);
    });
  });
});`,
      },
      {
        title: "Python Unit Tests (pytest)",
        code: `import pytest
from unittest.mock import Mock, patch, MagicMock
from datetime import datetime
from app.services.user_service import UserService
from app.models.user import User
from app.exceptions import UserNotFoundError, ValidationError

@pytest.fixture
def user_service():
    """Fixture for UserService instance"""
    return UserService()

@pytest.fixture
def sample_user():
    """Fixture for sample user data"""
    return User(
        id=1,
        email='test@example.com',
        name='Test User',
        created_at=datetime.now()
    )

class TestUserService:
    """Test suite for UserService"""

    def test_create_user_success(self, user_service):
        """Test successful user creation"""
        user_data = {
            'email': 'new@example.com',
            'name': 'New User',
            'password': 'SecurePass123!'
        }

        with patch('app.repositories.user_repository.create') as mock_create:
            mock_create.return_value = User(**user_data, id=1)

            result = user_service.create_user(user_data)

            assert result.email == user_data['email']
            assert result.name == user_data['name']
            mock_create.assert_called_once()

    def test_create_user_duplicate_email(self, user_service):
        """Test user creation with duplicate email"""
        user_data = {
            'email': 'existing@example.com',
            'name': 'User',
            'password': 'pass123'
        }

        with patch('app.repositories.user_repository.find_by_email') as mock_find:
            mock_find.return_value = User(id=1, **user_data)

            with pytest.raises(ValidationError) as exc_info:
                user_service.create_user(user_data)

            assert 'email already exists' in str(exc_info.value).lower()

    def test_get_user_by_id_success(self, user_service, sample_user):
        """Test retrieving user by ID"""
        with patch('app.repositories.user_repository.find_by_id') as mock_find:
            mock_find.return_value = sample_user

            result = user_service.get_user_by_id(1)

            assert result.id == sample_user.id
            assert result.email == sample_user.email
            mock_find.assert_called_once_with(1)

    def test_get_user_by_id_not_found(self, user_service):
        """Test retrieving non-existent user"""
        with patch('app.repositories.user_repository.find_by_id') as mock_find:
            mock_find.return_value = None

            with pytest.raises(UserNotFoundError):
                user_service.get_user_by_id(999)

    def test_update_user_success(self, user_service, sample_user):
        """Test successful user update"""
        update_data = {'name': 'Updated Name'}

        with patch('app.repositories.user_repository.update') as mock_update:
            updated_user = sample_user
            updated_user.name = 'Updated Name'
            mock_update.return_value = updated_user

            result = user_service.update_user(1, update_data)

            assert result.name == 'Updated Name'
            mock_update.assert_called_once()

    def test_delete_user_success(self, user_service):
        """Test successful user deletion"""
        with patch('app.repositories.user_repository.delete') as mock_delete:
            mock_delete.return_value = True

            result = user_service.delete_user(1)

            assert result is True
            mock_delete.assert_called_once_with(1)

    @pytest.mark.parametrize('email,expected', [
        ('valid@example.com', True),
        ('invalid-email', False),
        ('', False),
        ('missing@domain', False)
    ])
    def test_email_validation(self, user_service, email, expected):
        """Test email validation with various inputs"""
        result = user_service.validate_email(email)
        assert result == expected

    def test_list_users_pagination(self, user_service):
        """Test user listing with pagination"""
        mock_users = [
            User(id=i, email=f'user{i}@test.com', name=f'User {i}')
            for i in range(1, 11)
        ]

        with patch('app.repositories.user_repository.list') as mock_list:
            mock_list.return_value = mock_users[:5]

            result = user_service.list_users(page=1, limit=5)

            assert len(result) == 5
            mock_list.assert_called_once_with(offset=0, limit=5)`,
      },
    ],
  },
  "sql-optimization": {
    title: "SQL Optimization Examples",
    description: "Analyze and optimize database queries for better performance",
    examples: [
      {
        title: "Query Optimization Before/After",
        code: `-- ❌ BEFORE: Slow query with N+1 problem
SELECT * FROM users;
-- Then in application code, for each user:
SELECT * FROM orders WHERE user_id = ?;

-- ✅ AFTER: Optimized with JOIN
SELECT
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email;

-- ❌ BEFORE: Missing index, full table scan
SELECT * FROM orders
WHERE created_at >= '2024-01-01'
AND status = 'completed';

-- ✅ AFTER: Add composite index
CREATE INDEX idx_orders_date_status
ON orders(created_at, status);

SELECT * FROM orders
WHERE created_at >= '2024-01-01'
AND status = 'completed';

-- ❌ BEFORE: Using OR which prevents index usage
SELECT * FROM products
WHERE category_id = 1 OR category_id = 2 OR category_id = 3;

-- ✅ AFTER: Using IN for better index usage
SELECT * FROM products
WHERE category_id IN (1, 2, 3);

-- ❌ BEFORE: Function on indexed column prevents index usage
SELECT * FROM users
WHERE LOWER(email) = 'test@example.com';

-- ✅ AFTER: Create functional index or store lowercase
CREATE INDEX idx_users_email_lower ON users(LOWER(email));
-- OR
SELECT * FROM users
WHERE email = 'test@example.com'; -- assuming email is stored lowercase`,
      },
      {
        title: "Index Strategy",
        code: `-- Composite Index for Multi-Column Queries
CREATE INDEX idx_orders_user_date_status
ON orders(user_id, created_at DESC, status)
WHERE status != 'cancelled';

-- Covering Index (includes all columns in query)
CREATE INDEX idx_products_covering
ON products(category_id, price)
INCLUDE (name, description, stock);

-- Partial Index (for specific conditions)
CREATE INDEX idx_active_users
ON users(email)
WHERE is_active = true AND deleted_at IS NULL;

-- Full-Text Search Index
CREATE INDEX idx_products_search
ON products USING GIN(to_tsvector('english', name || ' ' || description));

-- Query using the full-text index
SELECT * FROM products
WHERE to_tsvector('english', name || ' ' || description) @@ to_tsquery('laptop');

-- Index for JSON Columns (PostgreSQL)
CREATE INDEX idx_user_metadata
ON users USING GIN(metadata jsonb_path_ops);

-- Query JSON index
SELECT * FROM users
WHERE metadata @> '{"premium": true}';

-- Monitoring Index Usage
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan ASC;

-- Find Unused Indexes
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan,
    pg_size_pretty(pg_relation_size(indexrelid)) as index_size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
AND schemaname = 'public'
ORDER BY pg_relation_size(indexrelid) DESC;`,
      },
      {
        title: "Query Performance Analysis",
        code: `-- EXPLAIN ANALYZE for detailed execution plan
EXPLAIN ANALYZE
SELECT
    p.id,
    p.name,
    c.name as category,
    AVG(r.rating) as avg_rating,
    COUNT(r.id) as review_count
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN reviews r ON p.id = r.product_id
WHERE p.price BETWEEN 100 AND 500
AND p.stock > 0
GROUP BY p.id, p.name, c.name
HAVING COUNT(r.id) >= 5
ORDER BY avg_rating DESC
LIMIT 20;

-- Identify slow queries (PostgreSQL)
SELECT
    query,
    calls,
    total_time,
    mean_time,
    max_time,
    rows
FROM pg_stat_statements
WHERE mean_time > 100
ORDER BY mean_time DESC
LIMIT 10;

-- Table bloat analysis
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) -
                   pg_relation_size(schemaname||'.'||tablename)) as index_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Optimize with materialized view
CREATE MATERIALIZED VIEW product_stats AS
SELECT
    p.id,
    p.name,
    p.price,
    COUNT(o.id) as order_count,
    SUM(o.quantity) as total_sold,
    AVG(r.rating) as avg_rating
FROM products p
LEFT JOIN order_items o ON p.id = o.product_id
LEFT JOIN reviews r ON p.id = r.product_id
GROUP BY p.id, p.name, p.price;

CREATE UNIQUE INDEX idx_product_stats_id ON product_stats(id);

-- Refresh materialized view
REFRESH MATERIALIZED VIEW CONCURRENTLY product_stats;

-- Use optimized view in queries
SELECT * FROM product_stats
WHERE avg_rating >= 4.0
AND total_sold > 100
ORDER BY order_count DESC;`,
      },
    ],
  },
  docker: {
    title: "Docker Skill Examples",
    description: "Container management, multi-stage builds, and optimization",
    examples: [
      {
        title: "Multi-Stage Dockerfile",
        code: `# Multi-stage build for Node.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \\
    npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Add non-root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nextjs -u 1001

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \\
  CMD node healthcheck.js || exit 1

# Start application
CMD ["node", "dist/server.js"]`,
      },
      {
        title: "Docker Compose Full Stack",
        code: `version: '3.8'

services:
  # Frontend Application
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        - NODE_ENV=production
    ports:
      - "3000:3000"
    environment:
      - API_URL=http://backend:4000
      - REDIS_URL=redis://redis:6379
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - app-network
    restart: unless-stopped
    volumes:
      - ./frontend/public:/app/public:ro

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=\${JWT_SECRET}
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # PostgreSQL Database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init-db.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network
    restart: unless-stopped
    command: redis-server --appendonly yes

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend
    networks:
      - app-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:`,
      },
      {
        title: "Docker Optimization Tips",
        code: `# .dockerignore - Reduce build context
node_modules
npm-debug.log
.git
.gitignore
.env
.env.local
*.md
.vscode
.idea
dist
coverage
.DS_Store

# Optimized Python Dockerfile
FROM python:3.11-slim as builder

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    gcc \\
    python3-dev \\
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.11-slim

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv

# Set environment
ENV PATH="/opt/venv/bin:$PATH" \\
    PYTHONUNBUFFERED=1 \\
    PYTHONDONTWRITEBYTECODE=1

# Create non-root user
RUN useradd -m -u 1000 appuser

WORKDIR /app

# Copy application
COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "app:app"]

# Docker commands for optimization
# Build with BuildKit for better caching
# DOCKER_BUILDKIT=1 docker build -t myapp .

# Remove unused images
# docker image prune -a

# View image layers
# docker history myapp:latest

# Scan for vulnerabilities
# docker scan myapp:latest

# Multi-platform build
# docker buildx build --platform linux/amd/64,linux/arm64 -t myapp:latest .`,
      },
    ],
  },
  kubernetes: {
    title: "Kubernetes Skill Examples",
    description: "Container orchestration, deployment strategies, and scaling",
    examples: [
      {
        title: "Complete Kubernetes Deployment",
        code: `apiVersion: v1
kind: Namespace
metadata:
  name: myapp-production
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: myapp-production
data:
  API_URL: "https://api.example.com"
  LOG_LEVEL: "info"
  MAX_CONNECTIONS: "100"
---
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: myapp-production
type: Opaque
data:
  database-url: cG9zdGdyZXM6Ly91c2VyOnBhc3NAZGI6NTQzMi9teWFwcA==
  jwt-secret: c3VwZXJzZWNyZXRrZXk=
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: myapp-production
  labels:
    app: web
    tier: frontend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: web
      tier: frontend
  template:
    metadata:
      labels:
        app: web
        tier: frontend
    spec:
      containers:
      - name: web
        image: myapp:v1.2.0
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
          name: http
        envFrom:
        - configMapRef:
            name: app-config
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: jwt-secret
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
          timeoutSeconds: 3
        volumeMounts:
        - name: app-storage
          mountPath: /app/data
      volumes:
      - name: app-storage
        persistentVolumeClaim:
          claimName: app-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: web-service
  namespace: myapp-production
spec:
  selector:
    app: web
    tier: frontend
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
    name: http
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-hpa
  namespace: myapp-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-pvc
  namespace: myapp-production
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: fast-ssd`,
      },
      {
        title: "Ingress & TLS Configuration",
        code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: myapp-production
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/cors-allow-origin: "https://example.com"
spec:
  tls:
  - hosts:
    - myapp.example.com
    - api.example.com
    secretName: app-tls-secret
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@example.com
    privateKeySecretRef:
      name: letsencrypt-prod-key
    solvers:
    - http01:
        ingress:
          class: nginx`,
      },
      {
        title: "StatefulSet for Databases",
        code: `apiVersion: v1
kind: Service
metadata:
  name: postgres-headless
  namespace: myapp-production
spec:
  clusterIP: None
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: myapp-production
spec:
  serviceName: postgres-headless
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        ports:
        - containerPort: 5432
          name: postgres
        env:
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        - name: PGDATA
          value: /var/lib/postgresql/data/pgdata
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "fast-ssd"
      resources:
        requests:
          storage: 20Gi`,
      },
    ],
  },
  "react-component": {
    title: "React Component Examples",
    description:
      "Generate modern, reusable React components with hooks and TypeScript",
    examples: [
      {
        title: "TypeScript Component with Hooks",
        code: `import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './DataTable.css';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  loading?: boolean;
  pageSize?: number;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  loading = false,
  pageSize = 10
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig(prev => {
      if (!prev || prev.key !== key) {
        return { key, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  }, []);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return <div className="data-table-loading">Loading...</div>;
  }

  return (
    <div className="data-table-container">
      <div className="data-table-controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="data-table-search"
        />
        <span className="data-table-info">
          Showing {sortedData.length} of {data.length} items
        </span>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={String(column.key)}
                onClick={() => column.sortable && handleSort(column.key)}
                className={column.sortable ? 'sortable' : ''}
              >
                {column.header}
                {sortConfig?.key === column.key && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map(column => (
                <td key={String(column.key)}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="data-table-pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;`,
      },
      {
        title: "Custom Hook Example",
        code: `import { useState, useEffect, useCallback, useRef } from 'react';

interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  cache?: boolean;
  retry?: number;
}

interface UseFetchResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
}

// Cache for storing API responses
const cache = new Map<string, any>();

export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);

  const fetchData = useCallback(async () => {
    const {
      method = 'GET',
      headers = {},
      body,
      cache: useCache = true,
      retry = 3
    } = options;

    // Check cache first
    const cacheKey = \`\${method}:\${url}\`;
    if (useCache && cache.has(cacheKey)) {
      setData(cache.get(cacheKey));
      setLoading(false);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const result = await response.json();

      // Store in cache
      if (useCache) {
        cache.set(cacheKey, result);
      }

      setData(result);
      retryCountRef.current = 0;
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          // Request was cancelled, don't update state
          return;
        }

        // Retry on failure
        if (retryCountRef.current < retry) {
          retryCountRef.current++;
          setTimeout(() => fetchData(), 1000 * retryCountRef.current);
          return;
        }

        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return {
    data,
    error,
    loading,
    refetch: fetchData
  };
}

// Usage Example:
// const { data, error, loading, refetch } = useFetch<User[]>('/api/users');`,
      },
      {
        title: "Form Component with Validation",
        code: `import React, { useState, useCallback } from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea';
  required?: boolean;
  validate?: (value: string) => string | null;
  placeholder?: string;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit'
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((field: FormField, value: string): string | null => {
    if (field.required && !value.trim()) {
      return \`\${field.label} is required\`;
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Invalid email address';
      }
    }

    if (field.validate) {
      return field.validate(value);
    }

    return null;
  }, []);

  const handleChange = useCallback((field: FormField, value: string) => {
    setFormData(prev => ({ ...prev, [field.name]: value }));

    // Validate on change if field was touched
    if (touched[field.name]) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field.name]: error || ''
      }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((field: FormField) => {
    setTouched(prev => ({ ...prev, [field.name]: true }));
    const value = formData[field.name] || '';
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field.name]: error || '' }));
  }, [formData, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    fields.forEach(field => {
      const value = formData[field.name] || '';
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    // Mark all fields as touched
    const allTouched = fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: true
    }), {});
    setTouched(allTouched);

    if (hasErrors) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({});
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || '';
    const error = touched[field.name] && errors[field.name];

    const commonProps = {
      id: field.name,
      name: field.name,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleChange(field, e.target.value),
      onBlur: () => handleBlur(field),
      placeholder: field.placeholder,
      className: \`form-input \${error ? 'error' : ''}\`
    };

    return (
      <div key={field.name} className="form-field">
        <label htmlFor={field.name} className="form-label">
          {field.label}
          {field.required && <span className="required">*</span>}
        </label>
        {field.type === 'textarea' ? (
          <textarea {...commonProps} rows={4} />
        ) : (
          <input {...commonProps} type={field.type} />
        )}
        {error && <span className="form-error">{error}</span>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="dynamic-form">
      {fields.map(renderField)}
      <button
        type="submit"
        disabled={isSubmitting}
        className="form-submit"
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </button>
    </form>
  );
};

export default DynamicForm;`,
      },
    ],
  },
};

// Function to open agent modal
function openAgentModal(agentType) {
  const modal = document.getElementById("agentModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  const agent = agentExamples[agentType];

  if (!agent) return;

  modalTitle.textContent = agent.title;

  let examplesHTML = `
    <p class="modal-description">${agent.description}</p>
    <div class="examples-container">
  `;

  agent.examples.forEach((example, index) => {
    examplesHTML += `
      <div class="example-item">
        <h3 class="example-title">
          <i class="fas fa-code"></i>
          ${example.title}
        </h3>
        <div class="code-container">
          <button class="copy-code-btn" onclick="copyCode('code-${agentType}-${index}')">
            <i class="fas fa-copy"></i> Copy
          </button>
          <pre><code id="code-${agentType}-${index}">${escapeHtml(example.code)}</code></pre>
        </div>
      </div>
    `;
  });

  examplesHTML += "</div>";
  modalBody.innerHTML = examplesHTML;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Function to close agent modal
function closeAgentModal() {
  const modal = document.getElementById("agentModal");
  if (!modal) {
    return;
  }

  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Function to open skill modal
function openSkillModal(skillType) {
  const modal = document.getElementById("agentModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  const skill = skillExamples[skillType];

  if (!skill) return;

  modalTitle.textContent = skill.title;

  let examplesHTML = `
    <p class="modal-description">${skill.description}</p>
    <div class="examples-container">
  `;

  skill.examples.forEach((example, index) => {
    examplesHTML += `
      <div class="example-item">
        <h3 class="example-title">
          <i class="fas fa-code"></i>
          ${example.title}
        </h3>
        <div class="code-container">
          <button class="copy-code-btn" onclick="copyCode('code-${skillType}-${index}')">
            <i class="fas fa-copy"></i> Copy
          </button>
          <pre><code id="code-${skillType}-${index}">${escapeHtml(example.code)}</code></pre>
        </div>
      </div>
    `;
  });

  examplesHTML += "</div>";
  modalBody.innerHTML = examplesHTML;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Function to copy code
function copyCode(codeId) {
  const codeElement = document.getElementById(codeId);
  if (!codeElement) {
    return;
  }

  const text = codeElement.textContent;

  navigator.clipboard.writeText(text).then(() => {
    const button = window.event?.target?.closest(".copy-code-btn");
    if (!button) {
      return;
    }

    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.style.background = "#10b981";

    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.background = "";
    }, 2000);
  });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

window.openAgentModal = openAgentModal;
window.closeAgentModal = closeAgentModal;
window.openSkillModal = openSkillModal;
window.copyCode = copyCode;

// Add event listeners to agent tags
document.addEventListener("DOMContentLoaded", () => {
  const agentTags = document.querySelectorAll(".agent-tag");

  agentTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const agentType = tag.getAttribute("data-agent");
      openAgentModal(agentType);
    });
  });

  // Add event listeners to skill cards
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("click", () => {
      const skillType = card.getAttribute("data-skill");
      openSkillModal(skillType);
    });
  });

  // Close modal when clicking outside
  const modal = document.getElementById("agentModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeAgentModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAgentModal();
    }
  });
});

window.addEventListener("load", logPerformance);

// Service Worker Registration (for PWA capability - optional)
if ("serviceWorker" in navigator) {
  // Uncomment to enable PWA
  // navigator.serviceWorker.register('/sw.js')
  //     .then(reg => console.log('Service Worker registered'))
  //     .catch(err => console.log('Service Worker registration failed'));
}
