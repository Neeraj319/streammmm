#!/bin/sh
while ! nc -z db 5432; do sleep 0.1; done;
npx prisma generate
yarn start:dev
