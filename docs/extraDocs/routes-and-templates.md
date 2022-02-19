# Rotas

Cada site tem sua pasta de modelos dentro de [`system/user/templates`](https://github.com/AppCivico/gov-tech__ma/tree/main/data/system/user/templates). A organização dos modelos define as rotas possíveis dentro da estrutura. Por exemplo, um modelo para abrir `/orcamentos/NOME-DO-ORCAMENTO` deve estar em `orcamentos.group/index.html`; um modelo para abrir `/historico/fatos/NOME-DO-FATO` deve estar em `/historico.group/fatos.html`.

Todos os modelos usam a [mesma sintaxe](https://docs.expressionengine.com/latest/templates/overview.html).

Dentro da pasta de modelos para para o site raiz (`default_site`), o correspondente ao portal do governo em si, a estrutura é:

- `default_site`
  - `agencia-de-noticias.group`
    - `index.html`
  - `agenda.group`
    - `index.html` - agenda do Governador
  - `busca.group`
    - `_search-form--tab.html`
    - `index.html`
    - `pln.html`
    - `resultados.html`
    - `sem_resultados.html`
  - `contatos.group`
    - `index.html` - lista de todos os sites/secretarias/departamentos
  - `documentos.group`
    - `index.html` - listagem de documentos e exibição de item único
  - `equipe.group`
    - `index.html` - reservado para páginas de estrutura personalizada
  - `estrutura-organizacional.group`
    - `index.html`
  - `eventos.group`
    - `index.html` - listagem de eventos e exibição de item único
  - `integrantes-do-governo.group`
    - `index.html`
  - `noticias.group`
    - `index.html` - listagem de notícias e exibição de item único
  - `privacidade.group`
    - `index.html`
    - `cookies.html` - reservada para página de solicitações de consentimento
  - `programas-ou-campanhas.group`
    - `index.html` - listagem de
  - `quem-e-quem.group`
    - `index.html`
  - `servicos.group`
    - `index.html` - listagem de serviços e exibição de item único
    - `secretarias.html` -
  - `site.group` - pasta raiz do site;
    - `index.html` - página inicial
    - `_aside.html`
    - `_cascade-menu.html`
    - `_consent_form.html`
    - `_footer-menu.html`
    - `_home-services.html`
    - `_home-special.html`
    - `_layout.html` - arquivo base HTML que envolve todos os outros
    - `_related.html`
    - `_sec-main__alt1.html` - modelos alternativos de páginas iniciais
    - `_sec-main__alt2.html` - modelos alternativos de páginas iniciais
    - `_sec-main__default.html` - página inicial de secretarias
    - `_sites-menu.html`
    - `404.html` - modelo para requisições não encontradas
    - `audio-polyfill.js` - gerado automaticamente
    - `manifest.js` - gerado automaticamente
    - `mix-manifest.json` - gerado automaticamente
    - `page.html` - reservado para páginas de estrutura personalizada
    - `scripts.js` - gerado automaticamente
    - `sitemap.xml`
    - `social_profiles.html`
    - `styles.css` - gerado automaticamente
  - `xml.group`
    - `sitemap.xml` - usado pelo crawler do Google
    - `rss.xml`

Os modelos dos sites filhos, correspondentes a secretarias e departamentos, usam proxies para os modelos principais:

```html
{embed="default_site:{segment_1}/index"}
```
