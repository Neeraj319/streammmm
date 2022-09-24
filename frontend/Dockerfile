FROM node:14-alpine AS development
ENV NODE_ENV development

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 3000

ENTRYPOINT [ "yarn", "dev" ]
