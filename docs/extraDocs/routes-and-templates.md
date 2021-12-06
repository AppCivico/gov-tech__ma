# Rotas

Cada site tem sua pasta de modelos dentro de [`system/user/templates`](https://github.com/AppCivico/gov-tech__ma/tree/main/data/system/user/templates). A organização dos modelos define as rotas possíveis dentro da estrutura. Por exemplo, um modelo para abrir `/orcamentos/NOME-DO-ORCAMENTO` deve estar em `orcamentos.group/index.html`; um modelo para abrir `/historico/fatos/NOME-DO-FATO` deve estar em `/historico.group/fatos.html`.

Todos os modelos usam a [mesma sintaxe](https://docs.expressionengine.com/latest/templates/overview.html).

Dentro da pasta de modelos para para o site raiz (`default_site`), o correspondente ao portal do governo em si, a estrutura é:

- `default_site`
  - `busca.group`
    - `index.html`
  - `documentos.group`
    - `index.html` - listagem de documentos e exibição de item único
  - `equipe.group`
    - `index.html`
  - `eventos.group`
    - `index.html` - listagem de eventos e exibição de item único
  - `integrantes-do-governo.group`
    - `index.html`
  - `noticias.group`
    - `index.html` - listagem de notícias e exibição de item único
  - `servicos.group`
    - `index.html` - listagem de serviços e exibição de item único
  - `site.group` - pasta raiz do site;
    - `index.html` - página inicial
    - `_cascade-menu.html`
    - `_footer-menu.html`
    - `_layout.html`
    - `404.html`
    - `page.html`
    - `scripts.js` - gerados automaticamente
    - `styles.js` - gerados automaticamente
  - `xml.group`
    - `sitemap.xml`
    - `rss.xml`


Os modelos dos sites filhos, correspondentes a secretarias e departamentos, usam proxies para os modelos principais:

```html
{embed="default_site:{segment_1}/index"}
```
