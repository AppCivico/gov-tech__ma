# Instalação e deploy

## Requisitos do mínimos de sistema

- docker community edition 19 or maior (testado na 19.03.12)
- docker-compose 1.21 ou superior
- Nginx ou outro proxy reverso para finalização do HTTPS
- Pelo menos 4 GB de RAM e 25GB de disco livres para as imagens dos containers.
- Servidor SMTP para envio de e-mails

O ExpressionEngine é a maior parte do código fonte deste projeto, e é escrito em PHP 7, e necessita de um banco de dados compatível com MySQL.

Existirá uma pequena parte escrita em Go, que é para fazer a comunicação com a API do Dialogflow. O código go é compilado para um binário durante o build da imagem, e pode ser copiado para subir sem o docker.

## Deploy com docker-compose

Containers:

![](images/container_ma_gov.svg)

Para facilitar a configuração, fornecemos um arquivo docker-compose.yml com os seguintes componentes:

- redis: redis-server 5 para cache do CMS
- db: Banco de dados para o CMS, MariaDB 10.5
- apache: Responsável por interpretar o PHP (CMS ExpressionEngine)
- pythia: API para autenticar os requests de busca para o Dialogflow
- nginx: Aplica regras de cache/rate-liming e load-balance entre as instancias do apache

Comunicação entre os containers:
![](images/conexoes-entre-containers-v2.png)

Na máquina onde ficará hospedado o docker, é necessário haver um serviço de proxy reverso; Pode ser nginx, ou outro de preferência, ele será responsável por fazer a terminação HTTPS e encaminhar o request para o container do nginx.

**ATENÇÂO** O proxy deve adicionar o IP do usuário real no header `X-Real-IP` para que o rate-limiting e os logs do CMS fiquem corretos.

Para subir este ambiente, é necessário ter pelo menos um dump do banco de dados e código fonte completo (com a versão correta do ExpressionEngine).

Neste repositório git há apenas o código fonte das alterações e templates.

O código da ExpressionEngine deve ser colocado na pasta `data/system/ee`, e os passos para instalação estão documentados em https://docs.expressionengine.com/latest/installation/installation.html

Existe um repositório para o código do CI/CD que faz o build do ambiente PHP com base neste repositório. Para ver todos os detalhes acesse a documentação do CD/CD.

Considerando que o arquivo `docker-compose.yml` e todo o código fonte deste repositório foi colocado na pasta

    /home/ubuntu/ma.appcivico.com/

Copie o arquivo `.env.sample` para `.env` e faça as configurações das variareis de ambiente. Até o dia 23-02-2022 as variáveis eram:

    REDIS_ALLOW_EMPTY_PASSWORD=no        - se o redis deve permitir senhas em branco
    REDIS_PASSWORD=secretpwd             - senha do redis
    
    NGINX_BIND_ADDRESS=172.17.0.1:50025  - qual interface e porta o nginx deve fazer o bind [ mudou para 10.22.8.188:80 em produção ]
    LOG_MAX_FILE=100                     - quantidade de logs para cada container do docker
    LOG_MAX_SIZE=1m                      - quantidade em MB para cada rotate do logs
    GOV_MA_SERVER_BASE_DIR               - local onde irá existir as versões do site com a pasta `current-version`
    GOV_MA_UPLOAD_DIR                    - local onde os uploads do site serão mantidos
    GOV_MA_IMAGE_DIR                     - local onde os avatares dos admins ficam
    REDIS_STORAGE                        - local onde o redis irá salvar o dump do cache quando reiniciado
    MYSQL_DATA                           - local onde o mariadb irá salvar o banco de dados
    NGINX_STORAGE                        - local onde o nginx irá salvar o cache e dados para rate-limiting
    PYTHIA_CONFIG_FILE_NAME              - nome do arquivo de config/auth (dialogflow)
    PYTHIA_CONFIG_DIR                    - local onde fica o key.json (dialogflow)
    GOOGLE_CLOUD_PROJECT_NAME            - nome do projeto do google (dialogflow)

    # apenas se for subir o banco usando docker-compose
    DATABASE_NAME=eedbnm                 - nome do banco de dados 
    DATABASE_USER=eeuser                 - nome do usuário do banco de dados
    DATABASE_PASSWORD=eepass             - senha do usuário do banco de dados
    DATABASE_ROOT_PASSWORD=eerootpass    - senha do usuário root do banco de dados
    
    

As imagens do redis e mariadb já estão prontas. As imagens do apache e nginx são construídas a partir do Dockerfile. O mesmo está na pasta `docker/apache/` e `docker/nginx/` respectivamente.

Antes de subir, será necessário verificar se as permissões dos diretórios dos serviços estão corretas.

    REDIS_STORAGE precisa ser 1001:1001 de acordo com https://hub.docker.com/r/bitnami/redis/
    MYSQL_DATA precisa ser 999:999 de acordo com https://github.com/MariaDB/mariadb-docker/blob/60caa9ea5c46b985ac6a7ebc93564a29791fca08/10.6/Dockerfile#L89
    NGINX_STORAGE precisa ser 101:101 de acordo com https://github.com/nginxinc/docker-nginx/blob/f958fbacada447737319e979db45a1da49123142/mainline/debian/Dockerfile#L14
    GOV_MA_UPLOAD_DIR &
    GOV_MA_SERVER_BASE_DIR precisam ser 33:33 (imagem do apache, user www-data)

Ao executar o comando `docker-compose up -d` e aguardar o download/build das imagens, você poderá executar o comando `docker-compose ps` e visualizar o resultado:

             Name                        Command               State            Ports
    -------------------------------------------------------------------------------------------
    ma_gov_mariadb            docker-entrypoint.sh mysqld      Up      3306/tcp
    ma_gov_web                /docker-entrypoint.sh ngin ...   Up      10.22.8.188:80->80/tcp
    ma_redis                  /opt/bitnami/scripts/redis ...   Up      6379/tcp
    ma_pythia                 (TODO)
    maappcivicocom_apache_1   /entrypoint.sh apache2-for ...   Up      80/tcp

O container do apache pode ser executado com mais de uma réplica caso o processo precise escalar. Porém, o apache já executa vários processo que podem saturar a CPU. De qualquer forma, se necessário, é possível adicionar mais processos do apache usando o comando `docker-compose up -d --scale apache=2` para ter dois containers do apache. O container `ma_gov_web` irá continuar usando a mesma porta e fazendo load-balance entre as instâncias dos apaches.

## Alterações nas configurações

Após fazer alterações no docker-compose, é necessário executar o comando para que as novas variáveis de ambiente ou imagens entrem no ar:

    docker-compose up -d --build

É importante acompanhar os logs para verificar se aconteceu algum problema:

    docker-compose logs -f

## Configuração do proxy reverso

Apenas para fins de exemplos, segue configuração que o AppCívico está usando no nosso proxy reverso (nginx)


    server {
        listen 80;
        server_name ma.appcivico.com.br;

        return 302 https://ma.appcivico.com.br$request_uri;
    }

    server {
        listen 443 ssl;

        #	server_name ma.appcivico.com.br turismo-ma.appcivico.com.br setur-ma.appcivico.com.br detran-ma.appcivico.com.br transito-ma.appcivico.com.br direitos-ma.appcivico.com.br sedihpop-ma.appcivico.com.br mapa-ma.appcivico.com.br stc-ma.appcivico.com.br agem-ma.appcivico.com.br agerp-ma.appcivico.com.br egma-ma.appcivico.com.br saf-ma.appcivico.com.br;

        # usando regexp para pegar todos os subdomínios que terminem com -ma.
        server_name ma.appcivico.com.br ~^\w+\-ma.appcivico.com.br;

        charset utf-8;

        # self signed -- ver https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04
        ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
        ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;

        location / {
            proxy_read_timeout 300s;
            proxy_connect_timeout 75s;
            proxy_pass http://172.17.0.1:50025; ## Endereço da interface do container `ma_gov_web`
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

    }

No caso, nosso HTTPS externo é realizado pela [CloudFlare](https://cloudflare.com/), que então faz o pedido para o nosso servidor, que entrega um certificado self-signed.
