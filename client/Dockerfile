#syntax=docker/dockerfile:1

FROM node:16-alpine

WORKDIR /usr/src/531logger/client

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
RUN npm install -g sass


COPY . .

CMD npm run start