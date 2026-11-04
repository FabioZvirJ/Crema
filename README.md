# Crema Lab — Gelato • Café • Experiências (Curitiba)

Aplicação web institucional e interativa da **Crema Lab**, projetada em **React 19 + TypeScript (Strict Mode) + Vite** com arquitetura em nível **Staff Engineer** e postura **Security-by-Design (Zero Trust Input / Zero Vulnerabilities)**.

---

## Arquitetura do Projeto

```text
src/
├── app/                  # Bootstrap, ErrorBoundary de isolamento de falhas e Router allowlisted
├── config/               # Políticas de segurança, limites de validação e metadados imutáveis
├── security/             # Camada dedicada de segurança (Sanitizer, SafeURL, RateLimiter, Validator)
├── domain/               # Modelos de domínio estritos e catálogos imutáveis (Sabores, Unidades, Conteúdo)
├── components/
│   ├── layout/           # Header, SubpageHero orgânico e Footer com newsletter protegida
│   ├── ui/               # Primitivas seguras (SafeExternalLink, FlavorModal, OrderDrawerModal)
│   └── visuals/          # Ilustrações botânicas SVG, ondas orgânicas e Mapa interativo de Curitiba
├── features/
│   ├── home/             # Página Inicial (Hero Slider 01/04, Pilares, Sobre a Chef, Sabores em Destaque, IG)
│   ├── flavors/          # Nossos Sabores (Filtro por categoria, Cards com scoops + ilustrações, Sazonais)
│   ├── locations/        # Nossas Unidades (Batel, ParkShoppingBarigui, Shopping Mueller, Experiência, Mapa)
│   ├── contact/          # Fale Conosco (Formulário validado, Canais diretos, Carrinho de Eventos, FAQs)
│   └── about/            # Nossa Trajetória (/sobre) e Journal do Lab (/blog)
└── test/                 # Suíte automatizada de segurança e integração (Vitest + Testing Library)
```

---

## Controles de Segurança Implementados

1. **Prevenção contra XSS, Injeção de Caracteres de Controle e Trojan Source (`src/security/sanitizer.ts`)**:
   - Remoção de tags HTML (`<script>`, `<img onerror=...>`), esquemas perigosos (`javascript:`, `vbscript:`, `data:`), bytes nulos e caracteres Unicode bidirecionais (`\u202A-\u202E`, CVE-2021-42574).
2. **Proteção contra Prototype Pollution (`createSafeRecord`)**:
   - Objetos derivados de entradas de usuário utilizam `Object.create(null)`, bloqueiam chaves `__proto__`, `constructor` e `prototype`, e são congelados (`Object.freeze`).
3. **Navegação Externa com Allowlist de Protocolo e Host (`src/security/safeUrl.ts` & `<SafeExternalLink>`)**:
   - Todo link externo é validado com `new URL()` contra protocolos (`https:`, `mailto:`, `tel:`) e domínios explicitamente autorizados, além de aplicar `rel="noopener noreferrer"` e `referrerPolicy="strict-origin-when-cross-origin"`.
4. **Roteador SPA Imune a Open Redirect (`src/app/router.tsx`)**:
   - Rotas validadas em tempo de compilação e execução contra um conjunto imutável (`ALLOWED_ROUTES`), bloqueando caminhos arbitrários ou URLs relativas a protocolo (`//evil.com`).
5. **Validação Linear (ReDoS-Safe), Honeypot Anti-Bot e Rate Limiting (`src/security/validation.ts` & `src/security/rateLimiter.ts`)**:
   - Validação de e-mail e telefone em tempo linear sem *catastrophic backtracking*, campo *honeypot* invisível contra bots automatizados e *Sliding-Window Rate Limiter* no envio de formulário e newsletter.
6. **Cabeçalhos HTTP de Segurança e CSP (`vite.config.ts`, `index.html`, `public/_headers`, `vercel.json`)**:
   - `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Cross-Origin-Opener-Policy: same-origin` e `Strict-Transport-Security`.

---

## Comandos Disponíveis

```bash
# Servidor de desenvolvimento com headers de segurança ativos
npm run dev

# Checagem estrita de tipos TypeScript
npm run typecheck

# Execução da suíte de testes de segurança e integração
npm test

# Build otimizado de produção (sem sourcemaps expostos)
npm run build
```

