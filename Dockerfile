#syntax=docker/dockerfile:1
FROM node:16-alpine

WORKDIR /usr/src/531logger/api

COPY ["package.json","package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 5000

CMD npm run server