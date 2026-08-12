# Qualidade (Fase 3)

## Contraste
- Texto teal sobre fundo claro usa `--mf-teal: #0F766E` (WCAG AA).
- Preenchimentos/gradientes podem usar `--mf-teal-fill: #0D9488` com texto branco.

## Lighthouse CI
Config: [`lighthouserc.json`](../../lighthouserc.json)

```bash
# na raiz (build + autorun local)
npm run lhci
```

Workflow: [`.github/workflows/quality.yml`](../../.github/workflows/quality.yml)

Asserções:
- accessibility ≥ 0.9 (erro)
- seo / best-practices ≥ 0.85 (aviso)
- performance ≥ 0.7 (aviso)

## Smoke e2e
Script: [`scripts/e2e-smoke.mjs`](../../scripts/e2e-smoke.mjs)

```bash
# API + preview em 5500, depois:
npm run test:e2e
```

Variáveis: `E2E_BASE_URL`, `E2E_API_URL`, `E2E_CHANNEL` (opcional: `chrome` / `msedge` se o Chromium do Playwright não estiver instalado).

Local sem browser baixado: o script tenta Chrome/Edge do sistema automaticamente.