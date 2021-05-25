# Set nginx base image
FROM nginx

LABEL vendor="nginx"
LABEL maintainer="Renato Santos <renato.santos@appcivico.com>"

RUN rm /etc/nginx/conf.d/default.conf

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf