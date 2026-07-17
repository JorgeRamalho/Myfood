# Changelog — MyFood

Registro das principais evoluções do projeto, alinhado ao histórico de desenvolvimento.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Unreleased]

### Planejado
- Integração contínua com APIs reais de geolocalização e cardápio
- Autenticação persistente e painel do restaurante

## [0.1.0] — 2026-07-16

### Added
- Scaffold monorepo: `frontend/` (Next.js + Vite/React) e `backend/` (NestJS)
- Identidade visual MyFood (logo, wordmark, hero, paleta, tipografia Syne/Sora/Figtree)
- Telas: Home, Buscar, Restaurante, Carrinho, Pedidos, Perfil e Baixar (QR Play Store / App Store)
- API REST: `auth`, `restaurants`, `menu`, `orders` + seed em memória
- README com avaliação de mercado e guia de execução

### Changed
- Conversão do layout app-like (frame mobile) para website responsivo
- Home reorganizada: carrossel de comidas, banner do app, destaques, categorias, restaurantes próximos e hero
- Header mobile: avatar do cliente e menu hambúrguer à direita
- Catálogo **Restaurantes próximos** enriquecido com estabelecimentos reais da região Guaíra / Portão / Água Verde (Curitiba-PR), referência CEP `80630-240` — Rua Previsto Columbia, 210

### Fixed
- Alinhamento de imagens do carrossel com os títulos dos pratos
- Remoção de artefatos temporários de auditoria que quebravam o Vite

### Notes
- Tempos de entrega, taxas e avaliações do catálogo local são ilustrativos para o demo
- Builds (`dist`, `.next`) e `node_modules` ficam fora do versionamento via `.gitignore`
