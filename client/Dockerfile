#syntax=docker/dockerfile:1

FROM node:16-alpine

WORKDIR /usr/src/531logger/client

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

EXPOSE 3000
EXPOSE 35729

COPY . .

CMD npm start