# MyFood

Website de restaurantes online — inspirado em iFood, 99Food e Uber Eats — com identidade visual própria, navegação web responsiva e instalação do app via QR Code (Play Store / App Store).

**Slogan:** O sabor que vem até você.  
**Tagline:** Peça. Saboreie. Repita.

---

## Avaliação rápida do mercado (web)

| Critério | iFood | 99Food | Uber Eats | MyFood (proposta) |
|---|---|---|---|---|
| Modelo | Marketplace + logística | Marketplace integrado ao ecossistema 99 | Marketplace global | Marketplace app-like (web-first) |
| Força | Escala, cupons, marca BR | Integração corrida/entrega | UX limpa e global | Identidade sofisticada + usabilidade guiada |
| Dor comum | Poluição visual / ruído promocional | Menor percepção de marca food | Menos “local” em alguns mercados | Clareza, acessibilidade e hierarquia visual |
| Oportunidade MyFood | — | — | — | Website responsivo, microinterações, design system e QR de instalação |

**Aprendizados aplicados no MyFood**
- Header sticky + menu desktop/mobile
- Caminhos curtos: Home → Categoria → Restaurante → Sacola → Pedido
- Feedback visual de status (pedido a caminho)
- Hero full-bleed com branding forte no primeiro viewport
- Acessibilidade: foco visível, skip link, `aria-*`, contraste e `prefers-reduced-motion`

---

## Identidade visual

### Marca
- **Nome:** MyFood
- **Logomarca:** `frontend/public/brand/logo-mark.png` (prato + monograma M)
- **Wordmark:** `frontend/public/brand/wordmark.png`
- **Hero:** `frontend/public/brand/hero-food.png`

### Paleta

| Token | Hex | Uso |
|---|---|---|
| Tomato | `#E0311F` | Primária / CTA |
| Cherry | `#9B1B1F` | Gradiente profundo |
| Teal | `#0D9488` | Destaques frescos / sucesso |
| Amber | `#F59E0B` | Avaliações / energia |
| Ink | `#141414` | Texto |
| Mist | `#F7F6F4` | Fundo |
| Blush | `#FFE4DC` | Superfícies suaves |

**Gradientes**
- Hero: `tomato → cherry`
- Fresh: `teal → teal-soft`
- Atmosphere: raios âmbar + tomato sobre mist

### Tipografia
- **Display (marca):** Syne
- **Títulos:** Sora
- **Corpo / UI:** Figtree
- Hierarquia: Display > Title > Body > Caption

---

## Estrutura de pastas

```text
Projeto-Myfood/
├── frontend/                 # Website (HTML/CSS/JS + React) e Next.js
│   ├── index.html            # Entrada HTML do site
│   ├── style.css             # Estilos globais do site
│   ├── js.script.js          # Scripts utilitários
│   ├── react/                # App React (Vite + React Router)
│   ├── public/brand/         # Logo, wordmark, fotos
│   └── src/                  # Versão Next.js (App Router)
├── backend/                  # NestJS — API REST
│   └── src/
│       ├── modules/          # auth, restaurants, menu, orders
│       ├── data/             # Seed em memória
│       └── common/           # Extensões futuras
└── README.md
```

---

## Como rodar

### Frontend — site HTML/CSS/JS + React (porta 5173)
```bash
cd frontend
npm install
npm run dev:site
```

Arquivos principais:
- `frontend/index.html`
- `frontend/style.css`
- `frontend/js.script.js`
- `frontend/react/`

### Frontend — Next.js (porta 3000)
```bash
cd frontend
npm run dev
```

### Backend (porta 3333)
```bash
cd backend
npm install
npm run start:dev
```

API base: `http://localhost:3333/api`

### Endpoints principais
- `GET /api/health`
- `POST /api/auth/guest`
- `GET /api/restaurants`
- `GET /api/restaurants/featured`
- `GET /api/restaurants/:id`
- `GET /api/restaurants/:restaurantId/menu`
- `GET /api/orders`
- `POST /api/orders`

---

## Páginas do website

| Rota | Função |
|---|---|
| `/` | Home com hero full-bleed, categorias e restaurantes |
| `/buscar` | Busca + filtros em grid |
| `/restaurante/[id]` | Cardápio e adicionar à sacola |
| `/carrinho` | Sacola e checkout simulado |
| `/pedidos` | Histórico e status |
| `/baixar` | QR Codes Play Store / App Store |
| `/perfil` | Conta e preferências |

---

## Acessibilidade e UX

- Skip link para conteúdo principal
- Contraste alto em textos e CTAs
- Foco visível (`:focus-visible`)
- Labels e `aria-label` em ações ícone
- Respeito a `prefers-reduced-motion`
- Layout website responsivo (container ~1180px) com header e footer

---

## Próximos passos sugeridos

1. Conectar frontend à API NestJS (substituir mocks)
2. Persistência com PostgreSQL + Prisma
3. Auth real (e-mail/OTP)
4. Painel do restaurante e admin
5. PWA (manifest + service worker) e links reais das lojas
