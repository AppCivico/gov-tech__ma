# Rotas

A organização dos modelos define as rotas possíveis dentro de cada site da estrutura completa.

Dentro da pasta de modelos para para o site raiz, o correspondente ao do governo em si, a estrutura é:

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

Todos modelos seguem a [mesma sintaxe](https://docs.expressionengine.com/latest/templates/overview.html).

Os modelos dos sites filhos, correspondentes a secretarias e departamentos, usam proxies para os modelos principais e usam a sintaxe:

```html
{embed="default_site:{segment_1}/index"}
```
