# ===== BUILD STAGE =====
FROM node:20-alpine AS builder

# Update Alpine packages
RUN apk update && apk upgrade --no-cache
RUN apk update && apk add --no-cache nano
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build


# ===== PRODUCTION STAGE =====
FROM node:20-alpine

# Install nano in the running container
RUN apk update && apk add --no-cache bash

WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy node modules
COPY --from=builder /app/node_modules ./node_modules

# Copy package files
COPY --from=builder /app/package*.json ./

EXPOSE 5001

CMD ["node", "dist/app.js"]


