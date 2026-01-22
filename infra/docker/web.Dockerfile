# Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY clients/web/package*.json ./clients/web/
RUN cd clients/web && npm ci

COPY clients/web ./clients/web
RUN cd clients/web && npm run build

# Run
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy build output + runtime deps
COPY --from=builder /app/clients/web/.next ./clients/web/.next
COPY --from=builder /app/clients/web/public ./clients/web/public
COPY --from=builder /app/clients/web/package*.json ./clients/web/
COPY --from=builder /app/clients/web/node_modules ./clients/web/node_modules

EXPOSE 3009
CMD ["sh", "-c", "cd clients/web && npm run start -- -p 3009"]
