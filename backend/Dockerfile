FROM node:18-alpine

WORKDIR /usr/src/app

# Ensure a small tool for healthchecks is available
RUN apk add --no-cache curl

# Copy package manifests first for cached installs
COPY package*.json ./

# If a lockfile exists, use `npm ci` for reproducible installs; otherwise fall back to npm install
RUN if [ -f package-lock.json ]; then npm ci --only=production; else npm install --production; fi

# Copy application source
COPY . .

# Ensure app files are owned by non-root user
RUN chown -R node:node /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Healthcheck using curl (present in image)
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/health || exit 1

USER node

CMD ["npm", "start"]
