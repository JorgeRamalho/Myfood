# MyFood API (NestJS)

API REST do MyFood — restaurantes, cardápio, pedidos e auth guest. Dados em memória via seed (MVP).

## Rodar

```bash
npm install
npm run start:dev
```

API: `http://localhost:3333/api`

## Endpoints

Ver [docs/api/endpoints.md](../docs/api/endpoints.md).

## Estrutura

```text
src/
├── modules/
│   ├── auth/
│   ├── restaurants/
│   ├── menu/
│   └── orders/
├── data/seed.ts
├── main.ts
└── app.module.ts
```

## Scripts

| Script | Uso |
|---|---|
| `npm run start:dev` | Desenvolvimento com watch |
| `npm run build` | Compila para `dist/` |
| `npm run start:prod` | Produção |
| `npm run test` | Unit |
| `npm run test:e2e` | E2E |

Próximos passos: PostgreSQL + Prisma, auth real, conectar o frontend canônico (Vite).
