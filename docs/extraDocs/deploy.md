# Instalação e deploy


## Requisitos do mínimos de sistema

- docker community edition 19 or maior (testado na 19.03.12)
- docker-compose 1.21 ou superior
- Nginx ou outro proxy reverso para finalização do HTTPS
- Pelo menos 4 GB de RAM e 25GB de disco livres para as imagens dos containers.
- Servidor SMTP para envio de e-mails

O ExpressionEngine é a maior parte do código fonte deste projeto, e é escrito em PHP 7, e necessita de um banco de dados compartível com MySQL.

<s>Existe uma pequena parte escrita em Go, que é para fazer a comunicação com a API do Dialogflow. O código go é complicado para um binário durante o build da imagem, e pode ser copiado para subir sem o docker.</s>

# Deploy com docker-compose

Para facilitar a configuração, fornecemos um arquivo docker-compose.yml com os seguintes componentes:

- db: Banco de dados para o CMS, MariaDB 10.5
- apache: Responsável por interpretar o PHP (CMS ExpressionEngine)
- redis: redis-server 5 para cache do CMS
- nginx: Aplica regras de cache/rate-liming e load-balance entre as instancias do apache


Na maquina onde ficará hospedado o docker, é necessário haver um serviço (pode ser nginx, ou outro de preferencia) para fazer a terminação HTTPS e encaminhar o request para o container do nginx.

**ATENÇÂO** O proxy deve adicionar o IP do usuário real no header `X-Real-IP` para que o rate-limiting e os logs do CMS fiquem corretos.


Para subir este ambiente, é necessário ter pelo menos um dump do banco de dados e código fonte completo (com a versão correta do ExpressionEngine).

Neste repositório git há apenas o código fonte das alterações e templates.

O código da ExpressionEngine deve ser colocado na pasta `data/system/ee`, e os passos para instalação estão documentados em https://docs.expressionengine.com/latest/installation/installation.html


Considerando que o arquivo `docker-compose.yml` e todo o código fonte deste repositório foi colocado na pasta

    /home/ubuntu/ma.appcivico.com/

Copie o arquivo `.env.sample` para `.env` e faça as configurações das variareis de ambiente. Atualmente as variáveis são:

    REDIS_ALLOW_EMPTY_PASSWORD=no        - se o redis deve permitir senhas em branco
    REDIS_PASSWORD=secretpwd             - senha do redis
    DATABASE_NAME=eedbnm                 - nome do banco de dados
    DATABASE_USER=eeuser                 - nome do usuário do banco de dados
    DATABASE_PASSWORD=eepass             - senha do usuário do banco de dados
    DATABASE_ROOT_PASSWORD=eerootpass    - senha do usuário root do banco de dados
    NGINX_BIND_ADDRESS=172.17.0.1:50025  - qual interface e porta o nginx deve fazer o bind
    LOG_MAX_FILE=100                     - quantidade de logs para cada container do docker
    LOG_MAX_SIZE=1m                      - quantidade em MB para cada rotate do logs


As imagens do redis e mariadb já estão prontas. As imagens do apache e nginx são construídas a partir do Dockerfile. O mesmo está na pasta `docker/apache/` e `docker/nginx/` respectivamente.

Ao executar o comando `docker-compose up -d` e aguardar o download/build das imagens, você poderá executar o comando `docker-compose ps` e visualizar o resultado:

             Name                        Command               State            Ports
    -------------------------------------------------------------------------------------------
    ma_gov_mariadb            docker-entrypoint.sh mysqld      Up      3306/tcp
    ma_gov_web                /docker-entrypoint.sh ngin ...   Up      172.17.0.1:50025->80/tcp
    ma_redis                  /opt/bitnami/scripts/redis ...   Up      6379/tcp
    maappcivicocom_apache_1   /entrypoint.sh apache2-for ...   Up      80/tcp

O container do apache pode ser executado com mais de uma replica caso o processo precise escalar. Porém, o apache já executa vários processo que podem saturar a CPU. De qualquer forma, se necessário, é possível adicionar mais processos do apache usando o comando `docker-compose up -d --scale apache=2` para ter dois containers do apache. O container `ma_gov_web` irá continuar usando a mesma porta e fazendo load-balance entre as instancias dos apaches.


# Configuração do proxy reverso

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

No caso, nosso HTTPS externo é realizado pelo https://cloudflare.com/ que então faz o pedido para o nosso servidor, que entrega um certificado self-signed.


