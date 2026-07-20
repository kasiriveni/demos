---
description: "Use when building Docker images, configuring containers, and setting up containerization. Covers Dockerfile best practices, docker-compose, environment management, and production readiness."
name: "Docker & Containerization"
applyTo: "{backend,frontend}/**/Dockerfile, docker-compose.yml"
---

# Docker & Containerization

## Dockerfile Best Practices

### Backend Dockerfile Structure

```dockerfile
# Use specific version for reproducibility
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Start application
CMD ["npm", "start"]
```

### Frontend Dockerfile Structure (Multi-stage)

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Install simple HTTP server
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
```

## Dockerfile Best Practices

### 1. Use Specific Base Image Versions

```dockerfile
# ✅ Good - specific version
FROM node:20.10-alpine

# ❌ Avoid - unpredictable updates
FROM node:latest

# ❌ Avoid - generic images
FROM alpine
```

### 2. Keep Layers Minimal

```dockerfile
# ❌ Bad - multiple RUN layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y wget

# ✅ Good - combined RUN
RUN apt-get update && \
    apt-get install -y curl wget && \
    rm -rf /var/lib/apt/lists/*  # Clean up cache
```

### 3. Order Instructions Strategically

```dockerfile
# Put frequently changing instructions last
FROM node:20-alpine
WORKDIR /app

# First: copy package files (rarely changes)
COPY package*.json ./
RUN npm ci

# Then: copy code (frequently changes)
COPY . .

# Last: build/compile (depends on code)
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### 4. Use .dockerignore

```
.dockerignore
node_modules
npm-debug.log
coverage
dist
.git
.gitignore
.env
.env.local
.DS_Store
Dockerfile
README.md
```

### 5. Set User for Security

```dockerfile
# Avoid running as root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

USER nodejs

CMD ["npm", "start"]
```

### 6. Health Checks

```dockerfile
# Express backend
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Or using curl (if available)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

## docker-compose Configuration

### Complete docker-compose.yml

```yaml
version: '3.8'

services:
  # Backend API service
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: todo-api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    depends_on:
      - # future: database
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
    restart: unless-stopped
    networks:
      - todo-network
    volumes:
      - ./backend/data:/app/data  # Optional: persist data
    labels:
      com.example.description: "TODO API Service"

  # Frontend service
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: todo-frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://backend:3000
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - todo-network
    labels:
      com.example.description: "TODO Frontend"

networks:
  todo-network:
    driver: bridge

volumes:
  # Optional: for persistent data
  todo-data:
    driver: local
```

## Environment Variables

### .env Configuration

```bash
# .env (local development)
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug

# .env.production (production)
NODE_ENV=production
PORT=3000
LOG_LEVEL=error
```

### Pass Environment Variables to Container

```bash
# Using -e flag
docker run -e NODE_ENV=production todo-api

# Using .env file
docker run --env-file .env.production todo-api

# In docker-compose
environment:
  - NODE_ENV=production
  - PORT=3000
```

## Building and Running Containers

### Build Image

```bash
# Build from Dockerfile in current directory
docker build -t todo-api:latest .

# Build with specific version tag
docker build -t todo-api:1.0.0 .

# Build without cache (force rebuild)
docker build --no-cache -t todo-api:latest .

# Build and specify base image args
docker build \
  --build-arg NODE_VERSION=20 \
  -t todo-api:latest .
```

### Run Container

```bash
# Basic run
docker run -p 3000:3000 todo-api:latest

# Run in background
docker run -d -p 3000:3000 --name todo-api todo-api:latest

# Run with environment variables
docker run -d -p 3000:3000 -e NODE_ENV=production todo-api:latest

# Run with volume mount
docker run -d -p 3000:3000 -v $(pwd)/data:/app/data todo-api:latest

# Run with network
docker run -d -p 3000:3000 --network todo-network --name api todo-api:latest
```

### Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend

# Rebuild images
docker-compose build --no-cache

# Run command in container
docker-compose exec backend npm test

# Remove volumes (clean everything)
docker-compose down -v
```

## Debugging Containers

### View Container Logs

```bash
# View logs from a running container
docker logs <container-id>

# Follow logs in real-time
docker logs -f <container-id>

# Show last 100 lines
docker logs --tail 100 <container-id>

# Docker Compose logs
docker-compose logs -f backend
```

### Execute Command in Container

```bash
# Run interactive shell
docker exec -it <container-id> /bin/sh

# Run specific command
docker exec <container-id> npm test

# Docker Compose
docker-compose exec backend /bin/sh
```

### Inspect Container

```bash
# Show container details
docker inspect <container-id>

# Show container stats
docker stats <container-id>

# Show running processes in container
docker top <container-id>
```

## Layer Optimization

### Check Image Size

```bash
# Show layer sizes
docker history todo-api:latest

# Show image size
docker images todo-api:latest
```

### Reduce Image Size

```dockerfile
# ✅ Use Alpine base image (small)
FROM node:20-alpine

# ✅ Use multi-stage build
FROM node:20-alpine AS builder
# ... build steps ...

FROM node:20-alpine
COPY --from=builder /app/dist ./dist

# ✅ Remove unnecessary files
RUN npm ci --only=production && \
    rm -rf node_modules/.cache

# ❌ Don't include test files, docs, etc.
# ❌ Don't copy unnecessary files
```

## Production Checklist

- ✅ Use specific base image version
- ✅ Multi-stage build for frontend
- ✅ Health checks configured
- ✅ Environment variables used for config
- ✅ Log level appropriate for environment
- ✅ Non-root user running app
- ✅ .dockerignore file present
- ✅ No sensitive data in image
- ✅ Image scanned for vulnerabilities
- ✅ Container exits gracefully on SIGTERM
- ✅ Restart policy configured
- ✅ Network isolation implemented
- ✅ Volume mounts for persistent data
- ✅ Resource limits set (if needed)

## Security Best Practices

### Never Store Secrets in Image

```dockerfile
# ❌ Bad - secrets in image
ENV API_KEY=secret123

# ✅ Good - pass at runtime
# Secrets passed via environment or secret management system
```

### Scan for Vulnerabilities

```bash
# Using Trivy
trivy image todo-api:latest

# Using docker scout
docker scout cves todo-api:latest
```

### Keep Base Image Updated

```bash
# Regularly rebuild with latest base image
FROM node:20.10-alpine  # Update version regularly
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs <container-id>

# Check if port is in use
lsof -i :3000

# Inspect image
docker inspect todo-api:latest
```

### Port Already in Use

```bash
# Use different port
docker run -p 3001:3000 todo-api

# Or kill process using port
lsof -ti:3000 | xargs kill -9
```

### Build Cache Issues

```bash
# Clear build cache
docker builder prune

# Build without cache
docker build --no-cache -t todo-api .
```

## Example Production Setup

```bash
# Build production images
docker build -t todo-api:1.0.0 ./backend
docker build -t todo-frontend:1.0.0 ./frontend

# Tag for registry
docker tag todo-api:1.0.0 registry.example.com/todo-api:1.0.0
docker tag todo-frontend:1.0.0 registry.example.com/todo-frontend:1.0.0

# Push to registry
docker push registry.example.com/todo-api:1.0.0
docker push registry.example.com/todo-frontend:1.0.0

# Run with production compose file
docker-compose -f docker-compose.prod.yml up -d
```
