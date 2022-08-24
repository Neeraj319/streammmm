import { TOKEN_TYPE } from './accessToken.entity';

export class RefreshTokenPayload {
  token: string;
  userId: number;
  type: TOKEN_TYPE.REFRESH;
}
