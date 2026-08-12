# ADR-002 — Arquivo do Next.js paralelo

**Status:** Aceito · 2026-08-11  
**Decisão:** A stack Next.js sai de `frontend/src/` e fica em `frontend/archive/next/`. O pacote `frontend/` passa a ser **somente** Vite + React.

## Contexto

Após ADR-001, o Next continuava ao lado do canônico, poluindo a raiz do frontend (`next.config.ts`, Tailwind/PostCSS, `tsconfig` Next, SVGs de boilerplate) e gerando drift de documentação/scripts.

## Decisão

- Mover `src/`, configs Next e docs de agente Next para `frontend/archive/next/`
- Remover dependências e scripts Next do `frontend/package.json` canônico
- Remover SVGs de template (`next.svg`, `vercel.svg`, etc.) não referenciados
- App canônico em `frontend/src/` (components, pages, context, data, styles, utils)

## Consequências

- `npm run dev` / `dev:site` no frontend = Vite
- Reviver Next exige reinstalar deps Next e apontar configs a partir de `archive/next/` (ver README do archive)
- CI e Live Server não dependem mais de `frontend/src/`

## Alternativas consideradas

- Manter Next instalado “só por precaução” — rejeitado: aumenta superfície e confusão
- Apagar Next sem archive — rejeitado: perde referência para SSR futuro
