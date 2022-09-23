interface ServerConfig {
  PORT: number;
}

interface IJwtConfig {
  secret: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

interface IRabbitMqConfig {
  hostname: string;
  username: string;
  password: string;
  queue: string;
  port: number;
}

interface IConfig {
  jwt: IJwtConfig;
  server: ServerConfig;
  rabbitMq: IRabbitMqConfig;
}
