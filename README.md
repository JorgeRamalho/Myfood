# MyFood

Website de restaurantes online — inspirado em iFood, 99Food e Uber Eats — com identidade visual própria, navegação web responsiva e instalação do app via QR Code (Play Store / App Store).

**Slogan:** O sabor que vem até você.  
**Tagline:** Peça. Saboreie. Repita.

Documentação completa: [docs/README.md](./docs/README.md)  
Pesquisa e roadmap: [docs/planning/roadmap.md](./docs/planning/roadmap.md)  
Marca: [docs/brand/guidelines.md](./docs/brand/guidelines.md)

---

## Estrutura (raiz enxuta)

```text
Projeto-Myfood/
├── index.html              # Redirect → frontend/
├── package.json            # Scripts orquestradores
├── docker-compose.yml      # Postgres (porta host 5434)
├── README.md
├── .gitignore
├── .vscode/                # Live Server
├── docs/                   # Documentação profissional
├── frontend/               # Site canônico: Vite + React
│   ├── index.html          # Redirect → dist-site
│   ├── vite.config.js · package.json
│   ├── config/             # Ferramentas (ESLint)
│   ├── src/                # App (HTML Vite + React)
│   ├── public/brand|media  # Assets (fonte da verdade)
│   └── archive/next/       # Next.js arquivado (ADR-002)
└── backend/                # NestJS + Prisma — API REST
    ├── prisma/             # schema, migrate, seed
    └── src/modules/        # auth, restaurants, menu, orders
```

Detalhes: [docs/structure/repository.md](./docs/structure/repository.md) · ADRs: [canônico](./docs/architecture/frontend-decision.md) · [arquivo Next](./docs/architecture/frontend-archive.md)

---

## Como rodar

### Frontend (Vite · porta 5173)

```bash
cd frontend
npm install
npm run dev
```

Build estático (Live Server / preview):

```bash
npm run build:site
```

Na raiz: `npm run dev` ou `npm run build:site`.

### Backend (Nest · porta 3333)

Requer Docker Desktop + Postgres:

```bash
npm run db:setup   # sobe Postgres :5434, migrate e seed Guaíra
cd backend
npm install
npm run start:dev
```

API: `http://localhost:3333/api` — ver [docs/api/endpoints.md](./docs/api/endpoints.md).

---

## Páginas

| Rota | Função |
|---|---|
| `/` | Home — hero, categorias, restaurantes |
| `/buscar` | Busca + filtros |
| `/restaurante/[id]` | Cardápio |
| `/carrinho` | Sacola / checkout simulado |
| `/pedidos` | Histórico e status |
| `/baixar` | QR Play Store / App Store |
| `/perfil` | Conta e preferências |

---

## API + frontend juntos

```bash
npm run db:up       # Postgres (se ainda não estiver up)
npm run dev:stack   # Nest + Vite
```

Ou em dois terminais: `npm run dev:backend` e `npm run dev:site`.

Sem a API no ar, o site ainda abre com **fallback** dos mocks locais (exceto checkout).

## Persistência (Fase 4)

| Script | Função |
|---|---|
| `npm run db:up` | `docker compose up -d` |
| `npm run db:migrate` | Prisma migrate |
| `npm run db:seed` | Catálogo Guaíra no banco |
| `npm run db:setup` | up + migrate + seed |

Detalhes: [ADR-003](./docs/architecture/persistence-prisma.md).

## Auth + PWA (Fase 5)

- Login/registro em `/perfil` (JWT). Demo cliente: `cliente@myfood.app` / `myfood123`
- Guest ainda funciona no checkout (JWT assinado)
- PWA: `vite-plugin-pwa` + CTA **Instalar MyFood** em `/baixar`
- Env: `JWT_SECRET` em `backend/.env` (ver `.env.example`)

Detalhes: [ADR-004](./docs/architecture/auth-jwt.md).

## Painel operador (Fase 6)

- Rota `/painel` — atualiza status dos pedidos
- Demo restaurante: `restaurante@myfood.app` / `myfood123`
- Demo admin: `admin@myfood.app` / `myfood123`
- Checkout mostra endereço demo Guaíra + pagamento na entrega

## Qualidade (Fase 3)

```bash
npm run lhci          # Lighthouse CI (após build)
npm run test:e2e      # smoke Playwright (API + site no ar)
```

Detalhes: [docs/quality/README.md](./docs/quality/README.md).

Lista completa: [docs/planning/roadmap.md](./docs/planning/roadmap.md).
