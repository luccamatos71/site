# Lumyn Site — Produção, SEO e Conversão

Site estático em HTML/CSS/JS com base pronta para domínio próprio, SEO técnico, GEO/AI Search e tracking.

## Estrutura principal

- `index.html`: landing principal
- `styles.css`: estilos da landing
- `script.js`: interações visuais da landing
- `config.js`: fonte única de dados editáveis (`window.LUMYN_SITE`)
- `site.js`: SEO dinâmico, schema JSON-LD, render de `/links`, dataLayer e tracking
- `links/index.html`: rota oficial `/links`
- `links/styles.css`: visual da `/links`
- `links/script.js`: utilitário da `/links`
- `vercel.json`: clean URLs + redirects
- `robots.txt` e `sitemap.xml`: indexação

## Onde editar dados da Lumyn

Edite apenas `config.js`:

- `siteUrl`: domínio canônico (troque para o domínio próprio após publicar)
- `brand.name`, `brand.tagline`, `brand.description`
- `channels.whatsappNumber`
- `channels.instagramUrl`
- `linksPage.buttons` (ordem e destinos dos botões da `/links`)

## Tracking pronto para GTM/GA4/Meta Pixel

`site.js` já expõe:

- `window.dataLayer`
- `window.trackEvent(name, params)`

Eventos já instrumentados:

- `click_whatsapp`
- `click_diagnostico`
- `click_instagram`
- `submit_form` (somente se houver formulário)
- `view_links_page`

Para ativar GTM:

1. Defina `tracking.enabled = true` em `config.js`
2. Preencha `tracking.gtmId` com o ID real

## Rotas e canonicalização

- Rota oficial de bio: `/links`
- Redirecionamento permanente: `/links.html` -> `/links`
- Política de host no `vercel.json`: redireciona `www.*` para raiz

## Publicação com domínio próprio

Depois de reconectar o acesso da Vercel ao escopo correto do time/projeto:

1. `vercel domains add SEUDOMINIO.com`
2. `vercel domains inspect SEUDOMINIO.com`
3. Configurar DNS no registrador (GoDaddy)
4. `vercel domains inspect SEUDOMINIO.com` até ficar `Valid Configuration`
5. `vercel certs ls` para validar SSL

## Observação importante

No momento, `siteUrl` está em domínio Vercel temporário para evitar hardcode inválido. Atualize para o domínio final antes da indexação definitiva.
