interface ServerConfig {
  PORT: number;
}

interface IJwtConfig {
  secret: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

interface IConfig {
  jwt: IJwtConfig;
  server: ServerConfig;
}
