FROM node:16.15-alpine AS nodebase
RUN npm install --location=global pnpm

FROM nodebase AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM nodebase AS runner
WORKDIR /app
COPY --from=deps /app/ ./
COPY . .

ENV LINE_CHANNEL_ACCESS_TOKEN=${LINE_CHANNEL_ACCESS_TOKEN}
ENV LINE_CHANNEL_SECRET=${LINE_CHANNEL_SECRET}

EXPOSE 3000

CMD ["pnpm", "dev"]