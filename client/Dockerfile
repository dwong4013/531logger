#syntax=docker/dockerfile:1

FROM node:16-alpine

RUN apk update && apk add bash

WORKDIR /usr/src/531logger/client

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
RUN npm install -g sass

EXPOSE 3000
EXPOSE 35729

COPY . .

CMD npm run start