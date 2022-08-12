FROM node:16.16.0-alpine3.15 AS development

WORKDIR /app

COPY package*.json /app/
COPY yarn.lock /app/
RUN npm install glob rimraf

RUN npm install yarn

RUN yarn install


COPY . /app/

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
