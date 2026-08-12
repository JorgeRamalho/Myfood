# ADR-001 — Frontend canônico

**Status:** Aceito · 2026-08-11 (atualizado com ADR-002)  
**Decisão:** O site canônico é **Vite + React** em `frontend/react/`, servido por `frontend/index.html` + `dist-site/`.

## Contexto

O repositório continha dois frontends paralelos:
1. Vite + React Router (`react/`, `vite.html`, `styles/`)
2. Next.js App Router (`src/`)

Isso gerava drift de UI, duplicação de dados e confusão de deploy (Live Server vs `next dev`).

## Decisão

- **Canônico:** Vite + React — Live Server e `npm run build:site`
- **Arquivado:** Next.js em `frontend/archive/next/` (ver [ADR-002](./frontend-archive.md))
- Mudanças de UX/marca aplicam-se primeiro no canônico

## Consequências

- Documentação e CI priorizam `build:site`
- Assets em `public/brand` e `public/media`
- App em `frontend/src/`; Live Server usa `dist-site/` após `build:site`

## Alternativas consideradas

- Tornar Next canônico — rejeitado: fluxo atual e Live Server dependem do build Vite
- Monorepo `apps/web` + `apps/api` — desejável a médio prazo; não bloqueia esta ADR
