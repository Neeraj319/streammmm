FROM node:16.16.0-alpine3.15 AS development

WORKDIR /app

RUN apk update && apk add netcat-openbsd 
RUN apk add bind-tools 
COPY package*.json /app/
COPY yarn.lock /app/
COPY prisma /app/prisma/

# RUN yarn install

COPY . /app/

RUN yarn global add @nestjs/cli
RUN npx prisma generate
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
