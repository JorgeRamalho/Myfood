# ADR-004 — Auth JWT (e-mail + senha)

## Status

Aceito (Fase 5)

## Contexto

Checkout e pedidos usavam apenas guest com token demo. Precisávamos de contas reais sem abandonar o fluxo convidado.

## Decisão

- JWT assinado (`JWT_SECRET`) via `@nestjs/jwt` + `passport-jwt`
- Registro/login com e-mail + senha (`bcrypt`)
- Guest continua (`POST /auth/guest`) com JWT real para o user `guest`
- `GET/POST /orders` exigem Bearer; `userId` vem do token
- Frontend: `AuthContext` + `myfood.session` no `localStorage`

## Demo

- `cliente@myfood.app` / `myfood123` (seed)

## Consequências

- Pedidos ficam isolados por usuário
- Trocar `JWT_SECRET` em produção
- Painéis admin/restaurante ficam para Fase 6+
