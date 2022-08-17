FROM node:16.16.0-alpine3.15 AS development

#RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /home/app

#USER root
#RUN apk update && apk add netcat-openbsd

#RUN chown -R appuser:appgroup /home/app
#RUN chmod 775 /home/app

#USER appuser
COPY package*.json /home/app/
COPY yarn.lock /home/app/
RUN yarn global add @nestjs/cli

COPY prisma /home/app/prisma/
RUN yarn 

COPY . /home/app/

#USER root
RUN chmod +x /home/app/entrypoint.sh

#USER appuser
RUN npx prisma generate

ENTRYPOINT ["/home/app/entrypoint.sh"]
