# Archive — Next.js (não canônico)

Snapshot do App Router movido de `frontend/src/` em 2026-08-11 ([ADR-002](../../../docs/architecture/frontend-archive.md)).

## Conteúdo

- `src/` — pages, components, context, data
- `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`
- `AGENTS.md` / `CLAUDE.md` — notas de agente Next

## Como reviver (opcional)

1. Restaurar configs para a raiz de `frontend/` (ou criar pacote `apps/web-next`)
2. Reinstalar deps Next/Tailwind, por exemplo:
   ```bash
   npm install next@16 eslint-config-next@16 tailwindcss @tailwindcss/postcss typescript @types/react @types/react-dom @types/node
   ```
3. Ajustar `package.json` scripts (`next dev`, `next build`)
4. Garantir assets em `frontend/public/brand` e `public/media`

Enquanto isso, **não** rode Next a partir deste archive sem restaurar o tooling — o `package.json` canônico do frontend é só Vite.
