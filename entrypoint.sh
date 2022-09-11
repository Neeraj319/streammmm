#!/bin/sh
while ! nc -z db 5432; do sleep 0.1; done;


npx prisma migrate dev
yarn start:dev

