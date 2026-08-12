# Estrutura do repositório

Documento de referência para manter a **raiz enxuta** e cada pacote com responsabilidade clara.

## Raiz (apenas entrada e orquestração)

```text
Projeto-Myfood/
├── .gitignore          # Ignora builds, deps, secrets
├── .vscode/            # Live Server e preferências do workspace
├── index.html          # Redirect → frontend/index.html
├── package.json        # Scripts orquestradores (dev/build)
├── README.md           # Visão do produto + como rodar
├── docs/               # Documentação profissional
├── frontend/           # Site canônico (Vite + React)
└── backend/            # API NestJS
```

**Regra:** não adicionar código de aplicação na raiz. Novos artefatos vão em `docs/`, `frontend/` ou `backend/`.

## `docs/` — documentação

| Pasta | Conteúdo |
|---|---|
| `brand/` | Identidade visual e tom de voz |
| `architecture/` | Overview + ADRs |
| `api/` | Contratos REST |
| `audit/` | Auditorias e scores |
| `planning/` | Roadmap e pesquisa |
| `structure/` | Layout do repositório (este arquivo) |

## `frontend/` — site canônico (raiz enxuta)

```text
frontend/
├── index.html          # Redirect → dist-site/ (Live Server)
├── package.json
├── vite.config.js
├── config/             # ESLint etc.
├── src/                # App React + HTML de entrada Vite
│   ├── index.html
│   ├── main.jsx · App.jsx
│   ├── components/ · pages/ · context/ · data/
│   ├── styles/ · utils/
├── public/
│   ├── brand/          # Fonte da verdade de marca
│   └── media/          # Carrossel e mídia local
├── dist-site/          # Build estático (gitignored)
└── archive/next/       # Stack Next.js arquivada (não canônica)
```

**Regra:** código de UI só em `src/`; assets estáticos só em `public/`.

## `backend/` — API

```text
backend/
├── package.json
├── nest-cli.json
├── .env.example
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── prisma/           # PrismaModule / PrismaService
│   ├── data/seed.ts      # catálogo Guaíra (fonte do seed DB)
│   └── modules/          # auth (JWT), restaurants, menu, orders
└── test/
```

Na raiz: `docker-compose.yml` (Postgres 16 · host **5434**).

## O que não fica versionado

- `node_modules/`, `.next/`, `dist/`, `dist-site/`
- `.env*` (exceto `.env.example` se existir)
