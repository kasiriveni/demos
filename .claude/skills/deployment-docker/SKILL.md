# Deployment & Docker Skill

**Description:** Deploy full-stack app with Docker, docker-compose, and production optimization.

**Use when:**
- Building Docker images for backend
- Using docker-compose for multi-container setup
- Configuring environment variables
- Deploying to production (AWS, Vercel, etc.)
- Troubleshooting container issues
- Optimizing build size and performance

## Docker Setup

### Build Backend Image
```bash
cd backend
docker build -t todo-api:latest .
docker run -p 3000:3000 todo-api:latest
```

### Build Frontend for Production
```bash
cd frontend
npm run build
# dist/ folder ready for static hosting
```

### Build Agent Website
```bash
cd agent-website
npm run build
# dist/ folder ready for deployment
```

## Docker Compose (Full Stack)

### Start All Services
```bash
docker-compose up
# or background
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Configuration
Check `backend/docker-compose.yml` for:
- Port mappings
- Environment variables
- Volume mounts
- Network setup

## Backend Dockerfile

**Location:** `backend/Dockerfile`

Key points:
- Node.js base image
- Copies package.json and installs deps
- Exposes port 3000
- Starts server with `npm start`

## Environment Variables

### Development
Create `.env` in backend:
```
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

### Production
```
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourdomain.com
ANTHROPIC_API_KEY=your_key_here
```

## Deployment Platforms

### AWS EC2
```bash
# SSH into instance
ssh -i key.pem ec2-user@instance

# Pull repo and run docker-compose
git clone <repo>
cd <repo>
docker-compose up -d
```

### Vercel (Frontend Only)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend/
cd frontend
vercel deploy --prod
```

### Heroku
```bash
heroku login
heroku create <app-name>
git push heroku main
```

## Production Checklist
- [ ] Set environment variables
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS for production domain
- [ ] Set up monitoring/logging
- [ ] Enable rate limiting
- [ ] Add authentication
- [ ] Database backup strategy
- [ ] Auto-restart on crash

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | `lsof -i :3000` then kill process |
| Build fails | Check node version (v18+) |
| Container won't start | `docker logs <container-id>` |
| CORS errors | Update CORS_ORIGIN in env |
| Network timeout | Check firewall/security groups |

## Cleanup
```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove volumes
docker volume prune
```
