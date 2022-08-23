export default () =>
  ({
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: +process.env.JWT_EXPIRATION,
      refreshExpiresIn: +process.env.JWT_REFRESH_EXPIRATION,
    },
    server: {
      PORT: +process.env.PORT || 3000,
    },
  } as IConfig);
