# Atualização contínua do ambiente de produção

Para manter o ambiente de produção atualizado, sem necessidade de login dos desenvolvedores, e padronização da maneira que o deploy é feito, foi criado um script para fazer a atualização do código PHP.

Este script é o arquivo `deploy.sh` no repositório `gov-tech__ma_ci`.

Esse script precisa ser executado como root, uma vez que ele executa outros containers docker, e também troca a permissão de alguns arquivos durante a sua execução.

Para facilitar a execução deste script de deploy, há também um serviço http que faz a execução deste arquivo quando acionado.

Esse serviço foi escrito em go, o código fonte pode ser visto em `dispatcher-server/main.go`, e para facilitar a execução, um binário para amd64 está incluso em `dispatcher-server/bin/dispatcher-server`. Para fazer o build deste binário pode-se utilizar o comando `make build` pois há um arquivo Makefile. Não há dependência externas, apenas go 16 é necessário para compilar.

Para manter esse serviço rodando, pode-se utilizar o arquivo de serviço para systemd localizado em `dispatcher-server/dispatcher-server.service`

# Configuração do ambiente em produção

Em /home/app foi criado os seguintes arquivos e diretórios:

- build-env/
- ci/
- persistent-storage/
- prod-env/
- www_versions/
- gov_ma_user_envfile
- run-deploy.sh

## build-env

Contém os arquivos necessários para fazer o build (compilar os assets), mas que podem ser reconstruídos.

     36K drwxr-xr-x 943 1000 1000  36K Sep  3 00:05 gov_ma_node_modules
    4.0K drwxr-xr-x   7    0    0 4.0K Sep  2 23:33 gov-tech__ma
    4.0K drwxr-xr-x   7 1000 1000 4.0K Sep  3 00:05 tmp-build

Dentro deste diretório, o diretório `gov_ma_node_modules` (1000:1000) irá guardar os arquivos do node_modules para acelerar o build. Pode ser criado vazio.

Dentro deste diretório, o diretório `gov-tech__ma` (0:0) irá guardar o código fonte base, é neste diretório que será feito o `git pull` para puxar a ultima versão do site. Não pode haver mudanças nesse local, por isso ele fica separado do clone feito para ter subir o ambiente persistente. Deve ser clonado.

Dentro deste diretório, o diretório `tmp-build` (1000:1000) é uma copia gov-tech__ma, porém aqui é feito o build e é removido sempre que um build começa, ficando com uma versão incompleta para debug quando o script de deploy.sh falha. Pode ser criado vazio.

## ci

Contém os arquivos para iniciar o deploy, são os arquivos do repositório `gov-tech__ma_ci`. Não é necessário modificação nestes arquivos, já que o `deploy.sh` pode ser configurado por variaveis de ambiente.

    8.0K -rwxr-xr-x 1    0    0 6.8K Sep  2 23:53 deploy.sh
    4.0K drwxr-xr-x 3    0    0 4.0K Sep  2 23:12 dispatcher-server
    4.0K -rw-r--r-- 1    0    0    8 Sep  2 23:12 .gitignore
    4.0K drwxr-xr-x 2    0    0 4.0K Sep  2 23:12 vendor

OBS: Atualização neste repositórios irá precisar do time de infra para atualizar esse local.

## persistent-storage

Aqui foram guardados os diretórios dos dados persistentes entre os builds, e que não são facilmente recriáveis.

    4.0K drwxr-xr-x 5  999  999 4.0K Sep  3 00:27 mysql
    4.0K drwxr-xr-x 4  101  101 4.0K Sep  3 00:06 nginx
    4.0K drwxr-xr-x 2 1001 1001 4.0K Sep  3 00:27 redis
    4.0K drwxr-xr-x 2   33   33 4.0K Sep  3 00:05 upload-dir
    4.0K drwxr-xr-x 2 1000 1000 4.0K Sep  3 00:05 pythia

Esses diretorias serão montados nos containers, pelo docker-compose. Os uid e gid devem estar conforme acima.

O script de deploy.sh irá escrever novos arquivos e pastas no `upload-dir` durante a sua execução, pois conforme entram novos subsites, novas pastas precisam ser inicializadas e estas não são criadas automaticamente pela aplicação PHP.

Na pasta `pythia` é apenas para guardar o arquivo de autenticação com o DialogFlow

    gov_ma_dialogflow_auth_file

Arquivo usado pelo container do pythia para se autenticar com o google DialogFlow

## www_versions

Pasta com o código fonte de todas as versões do site. Pode ser criada vazia na primeira vez, uid/gid 33:33

       0 lrwxrwxrwx 1   33   33   32 Sep  3 00:05 current-version -> data-build--2021-09-03-00h03m29s
    4.0K drwxr-xr-x 4   33   33 4.0K Sep  2 23:33 data-build--2021-09-03-00h03m29s

Quando o processo de build finaliza um build com sucesso, a pasta irá sair de `/home/app/build-env/tmp-build/data` e irá se tornar uma versão oficial. Para colocar essa versão no ar, um link simbólico chamado `current-version` é criado apontando para a nova versão.

Caso uma versão anterior precise ser colocada no ar, basta apontar o link simbólico para a versão correspondente.

OBS: atualmente, cada versão ocupa ~ 50 MB em disco, é necessário criar uma rotina para remover as versões anteriores, ou então executar o `rdfind` para criar hardlinks dos arquivos duplicados mas manter as versões.

## prod-env

Repositório `gov-tech__ma` com as configurações do ambiente (.env) para subir os containers da aplicação de acordo com os paths acima.

    4.0K -rw-r--r-- 1    0    0  343 Sep  2 23:35 babel.config.js
    4.0K drwxr-xr-x 4    0    0 4.0K Sep  2 23:35 data
    4.0K drwxr-xr-x 6    0    0 4.0K Sep  2 23:35 docker
    4.0K -rw-r--r-- 1    0    0 2.2K Sep  3 00:25 docker-compose.yml
    4.0K drwxr-xr-x 4    0    0 4.0K Sep  2 23:35 docs
    4.0K -rw-r--r-- 1    0    0  511 Sep  2 23:35 .editorconfig
    4.0K -rw-r--r-- 1    0    0  527 Sep  2 23:38 .env
    4.0K -rw-r--r-- 1    0    0  492 Sep  2 23:35 .env.sample
    4.0K -rw-r--r-- 1    0    0  211 Sep  2 23:35 .eslintrc.js
    4.0K drwxr-xr-x 8    0    0 4.0K Sep  2 23:35 .git
    8.0K -rw-r--r-- 1    0    0 5.3K Sep  2 23:35 .gitignore
     36K -rw-r--r-- 1    0    0  34K Sep  2 23:35 LICENSE
    4.0K -rw-r--r-- 1    0    0 2.0K Sep  2 23:35 package.json
    1.2M -rw-r--r-- 1    0    0 1.1M Sep  2 23:35 package-lock.json
    4.0K -rw-r--r-- 1    0    0  331 Sep  2 23:35 postcss.config.js
    4.0K -rw-r--r-- 1    0    0  275 Sep  2 23:35 README.md
    4.0K drwxr-xr-x 4    0    0 4.0K Sep  2 23:35 resources
    4.0K -rw-r--r-- 1    0    0 2.9K Sep  2 23:35 .sassdocrc
    4.0K -rw-r--r-- 1    0    0   46 Sep  2 23:35 .stylelintignore
    8.0K -rw-r--r-- 1    0    0 4.2K Sep  2 23:35 .stylelintrc.js
    4.0K -rw-r--r-- 1    0    0  250 Sep  2 23:35 webpack.mix.js

É neste local que estão salvas as configurações de senha e pastas do deploy neste ambiente.

    GOV_MA_SERVER_BASE_DIR=/home/app/www_versions
    GOV_MA_UPLOAD_DIR=/home/app/persistent-storage/upload-dir
    REDIS_STORAGE=/home/app/persistent-storage/redis
    MYSQL_DATA=/home/app/persistent-storage/mysql
    NGINX_STORAGE=/home/app/persistent-storage/nginx

OBS: existem outros valores neste arquivo.

Para reiniciar os serviços com as configurações novas, pode ser feito usando o comando `docker-compose up -d --build`. **ATENÇÂO** este comando irá causar downtime no site em caso de mudanças! pois o serviço do apache poderá ficar algum tempo fora do ar enquanto o container é recriado.

Só irá ser necessário executar o comando acima quando mudarem as imagens, ou uma configuração muito grande (trocar o local do banco de dados, por exemplo), pois a grande maioria das atualizações pode ser feita apenas atualizando o código PHP, sem mudanças nas extensões do PHP/apache.

## gov_ma_user_envfile

Arquivo usado pelo ExpressionEngine para carregar algumas configurações do sistema (eg: banco de dados, debug)

Esse arquivo é copiado durante o build para a pasta `[tmp-build]/data/system/user/config/.env`

o repositório `gov-tech__ma` tem um arquivo `data/system/user/config/.env.sample` com os valores de exemplo.
## run-deploy.sh

Script bash que realmente inicia o deploy, setando as variaveis de ambiente corretas para as pastas acima.

    # cat run-deploy.sh

    export GOV_MA_GIT_SRC_DIR=/home/app/build-env/gov-tech__ma
    export GOV_MA_SERVER_BASE_DIR=/home/app/www_versions
    export GOV_MA_UPLOAD_DIR=/home/app/persistent-storage/upload-dir
    export NODE_MODULES_CACHE_DIR=/home/app/build-env/gov_ma_node_modules
    export GOV_MA_USER_ENV_FILE=/home/app/gov_ma_user_envfile
    export GOV_MA_WORK_DIR=/home/app/build-env/tmp-build

    . /home/app/ci/deploy.sh

# Observações

Para que o upload fique constante e sem mudanças durante o build, ele é montando em `/var/www/uploads`, e então a cada build é criado um link simbólico dentro do `/var/www/versions/current-version/html` apontando para `../../../uploads`.

Numa primeira versão, ao montar diretamente em `/var/www/versions/current-version/html/uploads` o mapeamento funcionava, porém, o mount deixa de valer assim que o inode do link simbólico `current-version` era escrito.

Também tentamos fazer um map fora de `/var/www`, porém o apache insistia em retornar "apache client denied by server configuration" mesmo que o 000-default.conf estivesse carregando o diretório correto. Então criamos a estrutura de versions e uploads dentro do `/var/www`.

Da forma que está, o apache sempre visualiza e serve os requests a partir do `DocumentRoot /var/www/versions/current-version/html`.
Como há uma troca atômica do link, nenhum request é executado com uma versão incompleta dos arquivos do PHP.

# Configuração em produção do dispatcher-server

Com o seguinte arquivo de configuração no

    # cat /etc/systemd/system/dispatcher-server.service

    [Unit]
    Description=Deploy Dispacher
    After=network.target auditd.service

    [Service]
    Environment="LISTEN_ADDR=127.0.0.1:50024"
    Environment="DEPLOY_CMD=/home/app/run-deploy.sh"
    ExecStart=/home/app/ci/dispatcher-server/bin/dispatcher-server
    Restart=on-failure
    RestartPreventExitStatus=255
    Type=simple

    [Install]
    WantedBy=multi-user.target
    Alias=dispatcher-server.service

Ao executar `systemctl daemon-reload` e depois `systemctl start dispatcher-server` o serviço deverá estar em pé. Para iniciar um deploy, basta chamar `curl http://127.0.0.1:50024/deploy`

Essa chamada poderá ser executada por qualquer usuário com acesso a maquina, mesmo se não tiver root. Assim qualquer desenvolvedor poderá iniciar um deploy. Também pode-ser configurado um proxy ou mudar o bind deste serviço para que qualquer um com acesso a VPN consiga fazer essa chamada.
