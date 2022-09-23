export default () =>
  ({
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: +process.env.JWT_EXPIRATION,
      refreshExpiresIn: +process.env.JWT_REFRESH_EXPIRATION,
    },
    server: {
      PORT: process.env.PORT || 3000,
    },
    rabbitMq: {
      hostname: process.env.RABBITMQ_HOSTNAME,
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      queue: process.env.RABBITMQ_QUEUE,
      port: +process.env.RABBITMQ_PORT,
    },
  } as IConfig);
