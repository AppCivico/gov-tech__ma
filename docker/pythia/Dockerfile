FROM golang:1.16

ARG AUTH_FOLDER_INSIDE_CONTAINER
ARG JSON_KEY_FILENAME
ARG GOOGLE_CLOUD_PROJECT_NAME

# google cloud SDK
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y && apt-get install google-cloud-sdk google-cloud-sdk-app-engine-go -y
    
WORKDIR /app

COPY . ./
COPY ${JSON_KEY_FILENAME} ${AUTH_FOLDER_INSIDE_CONTAINER}

RUN gcloud auth activate-service-account --key-file ${AUTH_FOLDER_INSIDE_CONTAINER}${JSON_KEY_FILENAME}
RUN gcloud config set project ${GOOGLE_CLOUD_PROJECT_NAME}
RUN go mod download

RUN go build -o /pythia
CMD [ "/pythia" ]

