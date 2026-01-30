# --- Build stage ---
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci        # or npm install
COPY . .
RUN npm run build # Vite/React builds to dist/

# --- Runtime stage ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# (Optional but recommended for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80