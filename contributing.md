# Contributing to Streammmm

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued.

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
>
> - Star the project
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

### Configuration 

```sh
git clone https://github.com/Neeraj319/streammmm
cd streammmm
```
### Setting up env vars
```
cp .env.example .env # Configure env first
```
Following are the env vars explained
```
DATABASE_URL="postgresql://POSTGRES_USERNAME:POSTGRES_PASSWORD@db:POSTGRES_PORT/POSTGRES_DB?schema=public"
POSTGRES_USER=POSTGRES_USERNAME
POSTGRES_PASSWORD=POSTGRES_PASSWORD
POSTGRES_DB=POSTGRES_DB
JWT_SECRET=random string(can be anything)
JWT_EXPIRATION=in seconds, example: 20 mins = 120
JWT_REFRESH_EXPIRATION=in seconds, example: 7 days = 604800
RABBITMQ_HOSTNAME=YOUR_RABBITMQ_HOSTNAME
RABBITMQ_USERNAME=YOUR_RABBITMQ_USERNAME
RABBITMQ_PASSWORD=YOUR_RABBITMQ_PASSWORD
RABBITMQ_PORT=YOUR_RABBITMQ_PORT
RABBITMQ_CONNECTION_URI=amqp://guest:guest@broker_rabbitmq/
```



If you want to make changes the rest api then edit files in the `REST` folder.

If you want to make changes in the frontend then edit files in the `frontend` folder.

If you want to make changes in the worker then edit files in the `worker` directory.
