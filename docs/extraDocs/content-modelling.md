# Modelagem de conteúdo

Representação inicial de como os diferentes tipos de conteúdos, em forma de texto, imagem ou outros arquivos, serão guardados site.

## Terminologias

- **campo** - campo em formulário de publicação de conteúdo. Corresponde a uma coluna no banco de dados;
- **publicações** - itens mínimos salvos e que fazem sentido por si sós. Por exemplo, uma notícia, um funcionáro, um evento... Precisam ser configuras, mas não necessariamente preenchidas;
- **n×** - inúmeras publicações ou inúmeros itens;
- **secretaria** - departamentos, setores ou entidades do Governo do Estado do Maranhão;
- **...** - continuação de lista com itens diversos não especificados;

## Statuses

Para controlar a exibição e ordem das publicações salvas, independentemente de seu tipo, segue um conjunto básico de _statuses_. Podemos modificá-lo ou criar outros grupos.

- rascunho
- abertas
- destaques
- fechadas

```{.mermaid theme=dark background=transparent}
graph TB
    A([Statuses])
    A --- B(Rascunho)
    A --- C(Abertas)
    A --- D(Destaques)
    A --- E(Fechadas)
```

## Taxonomias

**Taxonomias** são critérios de classificação e que podem ser usado para agrupar publicações. Por exemplo, _tags_, categorias, escola artística, tipo, nacionalidade...

```{.mermaid theme=dark background=transparent}
graph LR
    A([Taxonomias])
    A --- B{Tipos de notícias}
    B -.- B1([...])
    A --- C{Tópicos}
    C -.- C1([...])
    A --- D{Secretarias}
    D -.- D1([...])
```

### Tipos de notícias

Segue lista inicial de sugestões para classificação de notícias.

- anúncio
- declaração oficial
- concurso
- notícia
- _press release_
- ...

No caso de _press releases_ terem a exata configuração de notícias, faz-se necessário separá-los uns dos outros com uma taxonomia.

```{.mermaid theme=dark background=transparent}
graph TB
    A([Taxonomias])
    A --- B{Tipos de notícias}
    B --- B1(Anúncio)
    B --- B2(Declaração oficial)
    B --- B3(Concurso)
    B --- B4(Notícia)
    B --- B5(Press release)
    B -.- B6([...])
    A --- C{Tópicos}
    C -.- C1([...])
    A --- D{Secretarias}
    D -.- D1([...])
```

### Tópicos

Classificação das notícias por assunto. Segue lista de forma alguma esgotada de exemplos:

- calendário oficial;
- campanha de vacinação;
- COVID-19;
- desmatamento;
- educação;
- impostos;
- habitação;
- ...

```{.mermaid theme=dark background=transparent}
graph TB
    A([Taxonomias])
    A --- B{Tipos de notícias}
    B -.- B1([...])
    A --- C{Tópicos}
    C --- C1(calendário oficial)
    C --- C2(campanha de vacinação)
    C --- C3(COVID-19)
    C --- C4(desmatamento)
    C --- C5(educação)
    C --- C6(impostos)
    C --- C7(habitação)
    C -.- C8([...])
    A --- D{Secretarias}
    D -.- D1([...])
```

### Secretarias

Dada a fusão de todos os canais de comunicação do Estado do Maranhão em um único site/endereço, as secretarias, setores ou entidades do Governo se tornam apenas classificadores que podem ser aplicados às publicações. Por exemplo:

- Governo do Maranhão;
- Laboratório Central de Saúde Pública;
- Secretaria da Fazenda;
- Secretaria de Cultura;
- Secretaria de Meio Ambiente e Recursos Naturais;
- ...

```{.mermaid theme=dark background=transparent}
graph TB
    0([Taxonomias])
    0 --- A{Secretarias}
    0 --- 02{Tópicos}
    02-.- 021([...])
    0 --- 03{Tipos de notícias}
    03-.- 031([...])
    A --- B(Governo do Maranhão)
    A --- C(Laboratório Central de Saúde Pública)
    A --- D(Secretaria da Fazenda)
    A --- E(Secretaria de Cultura)
    A --- F(Secretaria de Meio Ambiente e Recursos Naturais)
    A -.- G([...])
```

Diferentemente das outras taxonomias, as secretarias precisam de várias informações.

Campos:

- nome
- descrição curta
- endereço;
- inúmeros emails para atendimento
- inúmeros números de telefone para atendimento
- perfis em redes sociais:
  - Facebook;
  - Instagram;
  - LinkedIn;
  - Twitter;
  - WhatsApp;
  - YouTube.
  - ...
- identificadores de scripts personalizados
  - Google Analytics UA
  - Linha do tempo do twitter incorporada
    - link
    - largura >= 220
    - altura >= 200
    - tema
      - claro
      - escuro
    - idioma
  - Plugin de página do Facebook
    - link
    - largura
    - altura
    - usar cabeçalho reduzido
    - largura adaptável
    - ocultar cabeçalho
    - exibir rostos dos amigos
    - abas
      - timeline
      - events
      - messages
  - ID de lista de vídeos do YouTube

```{.mermaid theme=dark background=transparent}
graph TB
    A([Secretaria])
    A --- B(Nome)
    A --- C(Descrição curta)

    A --- AZ(Campos extras)
    AZ --- BZ(Título)
    AZ --- CZ(Texto)

    A --- D(Endereço)
    A --- E(n x Email)
    A --- F(n x Telefones)
    A --- G(Perfis de redes sociais)
    G --- H(Facebook)
    G --- I(Instagram)
    G --- J(LinkedIn)
    G --- K(Twitter)
    G --- L(WhatsApp)
    G --- M(YouTube)
    G -.- N([...])
```

## Tipos de publicações

### Anúncios publicitários / Informes

Serão apresentados no site como banners, painéis fixos ou painéis flutuantes/_dialogs_/_modais_/_in page popups_.

Campos:

- título
- data inicial
- data final
- resumo
- imagem em diferentes formatos:
  - estreita, para dispositivos móveis
  - larga, para dispositivos de mesa
- link
- posição na página
  - cabeçalho
  - coluna lateral
  - rodapé
  - painel flutuante em um endereço específico

Taxonomias:

- secretarias

```{.mermaid theme=dark background=transparent}
graph TB
    A([anúncios])
    A --- B(Título)
    A --- C(resumo)
    A --- D(imagens)
    D --- E(estreita)
    D --- F(larga)
    A --- G(link)

    A --- AZ(Campos extras)
    AZ --- BZ(Título)
    AZ --- CZ(Texto)

    A --- H{posição}
    H --- I(cabeçalho)
    H --- J(coluna lateral)
    H --- K(rodapé)
    H --- L(painel)
    L -.- M(endereço limitador)
    A --- Y{Secretarias}
    Y -.- Y0([...])
```

### Documentos

Documentos abertos aos cidadãos para manter um governo transparente.

Campos:

- título
- descrição
- arquivo
- conteúdo relacionado - publicações escolhidas manualmente entre **Notícias**, **Eventos** e **Serviços**

Taxonomias:

- secretarias
- tópicos

```{.mermaid theme=dark background=transparent}
graph TB
    A([Links sugeridos])
    A --- B(Título)
    A --- C(Descrição)
    A --- D(Arquivo)

    A --- AZ(Campos extras)
    AZ --- BZ(Título)
    AZ --- CZ(Texto)

    A --- E{Conteúdo relacionado}
    E -.- E0[Notícias]
    E -.- E1[Eventos]
    E -.- E2[Serviços]
    A --- Z{Status}
    Z -.- z0([...])
```

### Equipe

Publicações definem o organograma hierárquico da secretaria e podem ou não estar atreladas aos perfis de usuários do sistema.

Sugerimos que sejam separadas, para que apenas reais usuários do sistema tenham senhas.

Campos:

- nome;
- biografia;
- email público - que pode ser limitado ao domínio do site do governo, no caso, `ma.gov.br`;
- número público de telefone;
- n × campos extras
  - título
  - texto
- posição - a escolher a partir de lista predefinida para evitar erros de nomenclatura ou ortografia. Todas as opções devem ser femininas ou neutras em gênero.
  - opções:
    - direção;
    - presidência;
    - assessoria jurídica;
    - ...

```{.mermaid theme=dark background=transparent}
graph TB
    A([Equipe])
    A --- B(Nome)
    A --- C(Biografia curta)
    A --- D(Email público)
    A --- E(Número público de telefone)

    A --- AZ(Campos extras)
    AZ --- BZ(Título)
    AZ --- CZ(Texto)

    A --- F{Posição}
    F --- G(Direção)
    F --- H(Presidência)
    F --- I(Assessoria jurídica)
    F -.- J([...])
    A --- Z{Status}
    Z -.- z0([...])
```

### Eventos

Ocorrências em espaço físico ou virtual com convidados oficiais, públicos ou ações coletivas.

Campos:

- título;
- conteúdo
- ocorrências
  - data inicial;
  - data final;
- inúmeros child events - para o caso de um evento ser composto de vários outros. Por exemplo, uma _Semana de Cultura_, _Mês de vacinação_, etc...
- inúmeros dados diversos, para pequenos conjuntos extras de informação:
  - título
  - conteúdo
- inúmeras erratas / atualizações
  - data
  - conteúdo
- n × campos extras
  - título
  - texto


Taxonomias:

- secretarias
- tópicos

```{.mermaid theme=dark background=transparent}
graph TB
    A([Eventos])
    A --- B(Título)
    A --- C(Conteúdo)
    A --- A0
      A0 --- D(Data inicial)
      A0 --- E(Data final)
    A --- F{Eventos filhos}
    F -.- F0[Eventos]
    A --- G(Dados extras)
    G --- G1(Título)
    G --- G2(Conteúdo)
    A --- H(Erratas)
    H --- H1(Data)
    H --- H2(Conteúdo)

    A --- AZ(Campos extras)
    AZ --- BZ(Título)
    AZ --- CZ(Texto)

    A --- X{Secretarias}
    X -.- X0([...])
    A --- Y{Tópicos}
    Y -.- Y0([...])
    A --- Z{Status}
    Z -.- z0([...])
```

Taxonomias:

- secretarias

### Notícias

As notícias podem ser a respeito do Estado em si, de uma secretaria ou comuns a mais de uma delas; por exemplo, PROCON e Secretaria do Meio Ambiente, ao mesmo tempo. Portanto, devem ser independentes das secretarias.

Campos:

- título;
- título exclusivo para página única - opcional para o caso dele ser diferente do que aparece em listagens;
- resumo - opcional para ser exibido em listagens, ao invés de um recorte automático do conteúdo
- conteúdo;
- data;
- galeria:
  - inúmeros conjuntos de:
    - imagem estreita, para dispositivos móveis
    - imagem larga, para dispositivos de mesa
    - descrição;
    - legenda;
- link opcional da fonte
- inúmeros dados diversos, para pequenos conjuntos extras de informação:
  - título
  - conteúdo
- inúmeras erratas / atualizações
  - data
  - conteúdo
- conteúdo relacionado - inúmeras publicações escolhidas manualmente entre **Notícias**, **Eventos**, **Documentos**, **Serviços**;
- n × campos extras
  - título
  - texto

Taxonomias:

- secretarias
- tipos de notícias
- tópicos

```{.mermaid theme=dark background=transparent}
graph TB
    A([Notícias])
    A --- B(Título)
    A --- C(Título alternativo)
    A --- D(Conteúdo)
    A --- E(Data)
    A --- F{Galeria}
    F --- F0[Imagem estreita]
    F --- F1[Imagem larga]
    F --- F2[Descrição]
    F --- F3[Legenda]
    A --- G(Dados extras)
    G --- G1(Título)
    G --- G2(Conteúdo)
    A --- H(Erratas)
    H --- H1(Data)
    H --- H2(Conteúdo)
    A --- I(Link da fonte)
    A --- J{Evento}

    A --- AZ(Campos extras)
    AZ --- BZ(Título)
    AZ --- CZ(Texto)

    J -.- J0([...])
    A --- K{Serviços}
    K -.- K0([...])
    A --- W{Secretarias}
    W -.- W0([...])
    A --- X{Tipos de notícias}
    X -.- X0([...])
    A --- Y{Tópicos}
    Y -.- Y0([...])
    A --- Z{Status}
    Z -.- z0([...])
```

### Páginas livres

Páginas livres para conteúdos que não se classificam nas outras situações sugeridas.

Campos:

- título
- título exclusivo para página única - opcional para o caso dele ser diferente do que aparece em listagens;
- conteúdo
- n × campos extras
  - título
  - texto

```{.mermaid theme=dark background=transparent}
graph TB
    A([Página])
    A --- B(Título)
    A --- C(Conteúdo)
    A --- AZ(Campos extras)
    AZ --- BZ(Título)
    AZ --- CZ(Texto)
```

Taxonomias:

- secretarias

### Serviços

Descrição de serviços prestados pelas secretárias para alimentar a busca.

Campos:

- título
- título exclusivo para página única - opcional para o caso dele ser diferente do que aparece em listagens;
- resumo - opcional para ser exibido em listagens, ao invés de um recorte automático do conteúdo
- conteúdo;
- custo:
  - valor - com "gratuito" como opção;
  - unidade;
- link para sistema específico
- definition list × n
- press kits

```{.mermaid theme=dark background=transparent}
graph TB
    A([Serviço])
    A --- B(Título)
    A --- D(Conteúdo)
    A --- E(Custo)
    A --- F(Onde)
    A --- H(Quando)
    A --- K(Regulamentação correlata)
    A --- I(Link da fonte)
    A --- J{Evento}
    J -.- J0([...])
    A --- W{Secretarias}
    W -.- W0([...])
    A --- Z{Status}
    Z -.- z0([...])
```

Taxonomias:

- secretarias

### Links sugeridos

Especialmente para **parceiros e serviços**. Porém, precisamos rever a necessidade no caso de todos as secretarias e seus serviços se juntarem, o que é improvável. Alguns serviços, como _agendamento de emplacamento de veículo_ devem ficar de fora.

- URL
- nome
- secretaria - selecinada a partir de uma lista fechada?
- texto adjacente opcional

```{.mermaid theme=dark background=transparent}
graph TB
    A([Links sugeridos])
    A --- B(URL)
    A --- C(Nome)
    A --- D(Secretaria)
    A --- E(Texto)
    A --- Z{Status}
    Z -.- z0([...])
```
