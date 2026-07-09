# ===== BUILD STAGE =====
FROM node:20-alpine AS builder

# Update Alpine packages to fix known vulnerabilities
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ===== PRODUCTION STAGE =====
# Use a minimal Node.js image (distroless) or the same Alpine but with updates
# Option A: Use distroless (no shell, no package manager)
FROM gcr.io/distroless/nodejs20-debian12

# Option B: Use Alpine with updates (if you need a shell)
# FROM node:20-alpine
# RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Create a non-root user (distroless images don't support adduser, so skip)
# For Alpine, we'd add a user.

# Copy production artifacts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose port
EXPOSE 5001

# Run as non-root (distroless uses nobody: nogroup by default)
USER 65534:65534

CMD ["dist/app.js"]