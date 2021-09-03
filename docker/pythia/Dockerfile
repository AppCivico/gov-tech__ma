## Builder
FROM golang:1.16-alpine AS builder

WORKDIR /app
COPY go.mod .
COPY go.sum .

RUN go mod download

COPY dialogflow/ dialogflow/
COPY main.go .

RUN CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o pythia

## Deploy
FROM ubuntu:20.04 AS pythia
WORKDIR /root/

COPY --from=builder /app/pythia ./

CMD ["sh", "-c", "/root/pythia"]
