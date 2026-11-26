FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY src ./src

FROM node:22-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder --chown=appuser:appgroup /app /app

USER appuser
EXPOSE 8080
ENV PORT=8080

CMD ["node", "src/server.js"]
