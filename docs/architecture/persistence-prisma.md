# ADR-003 — Persistência com Nest + PostgreSQL + Prisma

## Status

Aceito (Fase 4)

## Contexto

A API Nest usava catálogo e pedidos em memória. Precisávamos de persistência local previsível sem trocar o backend Nest já integrado ao frontend (Fase 2).

## Decisão

- **PostgreSQL 16** via `docker-compose.yml`
- **Prisma 6** (`prisma` + `@prisma/client`) — schema clássico com `url` no `datasource`
- Porta host **5434** (evita conflito com Postgres local em 5432 e outros containers em 5433)
- Seed idempotente a partir de `backend/src/data/seed.ts` (sync do mock React)

## Alternativas consideradas

| Opção | Motivo de não usar agora |
|---|---|
| Convex | Excelente para real-time; exigiria outro client e auth model |
| Prisma 7 | Quebrou `url` no schema; mais config (`prisma.config.ts` / adapters) |
| SQLite | Mais simples, menos alinhado ao alvo produção |

## Consequências

- Antes de `dev:backend`: `npm run db:up` (Docker Desktop ligado) e migrate/seed se for primeira vez
- `DATABASE_URL` em `backend/.env` (ver `.env.example`)
- Pedidos e guest passam a sobreviver a restart da API
