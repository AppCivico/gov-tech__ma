# Set nginx base image
FROM nginx

LABEL vendor="nginx"
LABEL maintainer="Renato Santos <renato.santos@appcivico.com>"

RUN rm /etc/nginx/conf.d/default.conf

COPY mime.types /etc/nginx/mime.types

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf