#syntax=docker/dockerfile:1
FROM node:16-alpine AS development

WORKDIR /usr/src/531logger/api

COPY ["package.json","package-lock.json*", "./"]

RUN npm install

COPY . .

CMD npm run server

FROM development AS production

CMD NODE_ENV=production node server