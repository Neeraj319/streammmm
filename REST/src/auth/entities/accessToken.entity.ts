export enum TOKEN_TYPE {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
export class JwtAccessTokenPayload {
  userId: number;
  username: string;
  type: TOKEN_TYPE.ACCESS;
}
