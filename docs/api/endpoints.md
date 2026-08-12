# API MyFood (NestJS)

Base: `http://localhost:3333/api`

Respostas: `{ "data": ... }` (+ `message` em POSTs/PATCHs).

## Endpoints

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/health` | — | Health |
| POST | `/auth/register` | — | Conta cliente |
| POST | `/auth/login` | — | Login |
| POST | `/auth/guest` | — | Guest + JWT |
| GET | `/auth/me` | Bearer | Usuário atual |
| GET | `/restaurants` | — | Lista |
| GET | `/restaurants/featured` | — | Destaques |
| GET | `/restaurants/:id` | — | Detalhe |
| GET | `/restaurants/:restaurantId/menu` | — | Cardápio |
| GET | `/menu/:id` | — | Item |
| GET | `/orders` | Bearer | Pedidos do cliente |
| GET | `/orders/manage` | Bearer + role restaurant/admin | Fila operacional |
| POST | `/orders` | Bearer | Criar pedido |
| PATCH | `/orders/:id/status` | Bearer + role restaurant/admin | Atualizar status |

### PATCH `/orders/:id/status`

```json
{ "status": "a_caminho" }
```

Valores: `preparando` | `a_caminho` | `entregue` | `cancelado`.

## Contas demo (seed)

| E-mail | Senha | Papel |
|---|---|---|
| `cliente@myfood.app` | `myfood123` | customer |
| `restaurante@myfood.app` | `myfood123` | restaurant (Távola) |
| `admin@myfood.app` | `myfood123` | admin |

## Env

```env
DATABASE_URL="postgresql://myfood:myfood@127.0.0.1:5434/myfood?schema=public"
PORT=3333
JWT_SECRET="myfood-dev-secret"
```

## Rodar

```bash
npm run db:setup
npm run dev:stack
```

Painel UI: `/#/painel` (após login parceiro/admin).
