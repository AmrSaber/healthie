FROM oven/bun:1-alpine

ENV PORT=80
EXPOSE $PORT

# Health check
RUN apk add curl
HEALTHCHECK --interval=5s --timeout=3s CMD curl -f "http://localhost:$PORT/health" || exit 1

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src .

CMD ["bun", "start"]
