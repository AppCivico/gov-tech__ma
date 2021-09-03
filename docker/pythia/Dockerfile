FROM golang:1.16 AS pythia

ARG AUTH_FOLDER_INSIDE_CONTAINER
ARG JSON_KEY_FILENAME
    
WORKDIR /app

COPY . ./
COPY ${JSON_KEY_FILENAME} ${AUTH_FOLDER_INSIDE_CONTAINER}

RUN go mod download && go build -o /pythia
CMD [ "/pythia" ]

