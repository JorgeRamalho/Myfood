# Frontend MyFood (canônico)

Site **Vite + React Router**. Fonte da verdade de UI e marca.

## Como rodar

```bash
npm install
npm run dev          # Vite em http://localhost:5173
npm run build:site   # Gera dist-site/
npm run preview:site # Preview do build
```

Live Server: `frontend/index.html` redireciona para `dist-site/` (rode `build:site` antes).

## Estrutura (raiz enxuta)

```text
frontend/
├── index.html           # Redirect → dist-site (Live Server)
├── package.json
├── vite.config.js
├── README.md
├── config/              # ESLint e configs de ferramenta
├── src/                 # App (HTML de entrada Vite + React)
│   ├── index.html
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── data/
│   ├── styles/
│   └── utils/
├── public/
│   ├── brand/           # Marca (fonte da verdade)
│   └── media/           # Carrossel
├── dist-site/           # Build (gitignored)
└── archive/next/        # Next.js arquivado
```

## Documentação

- [ADR-001 — canônico](../docs/architecture/frontend-decision.md)
- [ADR-002 — archive Next](../docs/architecture/frontend-archive.md)
- [Estrutura do repo](../docs/structure/repository.md)
