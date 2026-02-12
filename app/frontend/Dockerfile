# --- Build stage ---
FROM node:18 AS build
WORKDIR /app

# Copy only manifests first for better caching
COPY package*.json ./

# Install deps including devDependencies needed for build
# Use npm ci if package-lock.json exists; fallback to npm install
RUN if [ -f package-lock.json ]; then npm ci --include=dev; else npm install --include=dev; fi

# (Diagnostic) Confirm vite is installed in this image; remove later if you want
RUN npx --yes vite --version

# Copy the rest of your source
COPY . .

# Build (this runs "vite build")
RUN npm run build

# --- Runtime stage ---
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build output from the build image
COPY --from=build /app/dist ./

# If you use client-side routing (React/Vue SPA), make sure nginx.conf uses index.html fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# Nginx starts with its default CMD
