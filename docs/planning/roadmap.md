# Planejamento e roadmap

## Pesquisa de mercado (síntese)

Comparativo aplicado ao MyFood (web-first, app-like):

| Critério | iFood | 99Food | Uber Eats | MyFood |
|---|---|---|---|---|
| Modelo | Marketplace + logística | Ecossistema 99 | Marketplace global | Marketplace web-first |
| Força | Escala e cupons | Integração corrida/entrega | UX limpa | Identidade + usabilidade guiada |
| Dor comum | Ruído promocional | Marca food menos forte | Menos “local” | — |
| Oportunidade | — | — | — | Clareza, a11y, design system, QR de instalação |

**Aprendizados incorporados:** header sticky, caminhos curtos (Home → Categoria → Restaurante → Sacola → Pedido), status visual do pedido, hero full-bleed com marca no first viewport, acessibilidade (`aria-*`, foco, `prefers-reduced-motion`).

Detalhes de marca: [brand/guidelines.md](../brand/guidelines.md).

## Estado atual (MVP)

- [x] Site canônico Vite + React com rotas principais
- [x] Identidade visual e assets em `public/brand` + mídia local do carrossel
- [x] API NestJS + **PostgreSQL/Prisma** — auth guest, restaurants, menu, orders
- [x] Documentação profissional (`docs/`) e raiz enxuta
- [x] Stack Next.js movida para `frontend/archive/next/` (não bloqueia o canônico)
- [x] **Fase 2** — frontend canônico consome Nest (`/api/*`) com fallback offline
- [x] **Fase 3 (qualidade)** — contraste teal AA, Lighthouse CI, smoke e2e
- [x] **Fase 4 (persistência)** — Docker Postgres + Prisma 6 + migrate/seed Guaíra
- [x] **Fase 5 (auth + PWA)** — JWT e-mail/senha, guest com JWT, PWA instalável
- [x] **Fase 6 (MVP operador)** — painel restaurante/admin, status de pedidos, checkout com endereço, CI com Postgres

## Próximos passos (pós-MVP)

1. **Auth avançado** — OTP/OAuth (se necessário)
2. **Links nativos** — substituir placeholders Play/App Store quando o app existir
3. **CRUD cardápio** — gestão completa de itens no painel parceiro

## Decisões em aberto

| Tema | Opções | Nota |
|---|---|---|
| SSR / SEO avançado | Manter estático · Reviver Next do archive · Outro framework | Ver ADR-001 / ADR-002 |
| Monorepo | Manter pastas atuais · `apps/web` + `apps/api` | Desejável médio prazo |
| Real-time | Polling · WebSocket · Convex | Persistência Nest + Postgres (ADR-003); auth JWT (ADR-004) |

## Como contribuir na organização

1. Código novo só em `frontend/src/` ou `backend/src/`
2. Decisões estruturais → ADR em `docs/architecture/`
3. Não reintroduzir arquivos mortos na raiz nem SVGs de boilerplate
4. Atualizar [structure/repository.md](../structure/repository.md) se a árvore mudar
