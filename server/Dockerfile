FROM node:20.8.0
LABEL authors="haikalfluzain"

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . ./
EXPOSE 5000
#CMD yarn start