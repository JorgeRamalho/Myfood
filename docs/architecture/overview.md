# Arquitetura — overview

```text
[Browser]
   │  Vite (:5173) / Live Server (:5502) / preview
   ▼
frontend/src/      ← site canônico (Vite + React + PWA)
   │  REST /api/*  (+ Bearer JWT; fallback mocks se Nest offline)
   ▼
backend/           ← NestJS API (porta 3333)
   │  Prisma Client + JWT
   ▼
PostgreSQL         ← Docker Compose (host :5434 → container :5432)
```

## Pacotes

| Pasta | Stack | Papel |
|---|---|---|
| `frontend/` | Vite + React Router + CSS | **Canônico** — `build:site` → `dist-site/` |
| `frontend/src/api/` | fetch wrappers | Cliente REST + `withFallback` |
| `frontend/archive/next/` | Next.js (arquivado) | Referência SSR futura — não é produto |
| `backend/` | NestJS + Prisma | API REST |
| `docker-compose.yml` | Postgres 16 | Persistência local |

## Scripts raiz

- `npm run db:up` / `db:migrate` / `db:seed` / `db:setup` — Postgres + schema + catálogo
- `npm run dev:stack` — Nest + Vite juntos
- `npm run dev` / `dev:site` — só Vite
- `npm run dev:backend` — Nest watch
- `npm run build` / `build:site` — gera `frontend/dist-site/`
- `npm run sync:seed` — regenera `backend/src/data/seed.ts` a partir do mock React (depois `npm run db:seed`)

## Dados

- **Online:** `GET/POST http://127.0.0.1:3333/api/*` (lê/escreve Postgres)
- **Offline / Nest down:** listagens usam `frontend/src/data/index.js`
- **Checkout:** exige API (`POST /auth/guest` ou login + `POST /orders`)
- **Operação:** `/painel` (roles `restaurant` / `admin`) atualiza status via `PATCH /orders/:id/status`
- **Seed:** `backend/prisma/seed.ts` carrega catálogo + contas demo

Ver: [endpoints](../api/endpoints.md) · [estrutura](../structure/repository.md) · [roadmap](../planning/roadmap.md) · [ADR-003](./persistence-prisma.md).
