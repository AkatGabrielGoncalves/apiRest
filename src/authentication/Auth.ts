import jwt, { Secret } from 'jsonwebtoken';

export interface authMethods {
  sign: (string: string) => string;
  verify: (token: string) => string | jwt.JwtPayload;
}

class Auth implements authMethods {
  private secret: jwt.Secret;

  private expiration: string;

  constructor() {
    this.secret = process.env.TOKEN_SECRET as Secret;
    this.expiration = process.env.TOKEN_EXPIRE as string;
  }

  sign = (string: string) =>
    jwt.sign(string, this.secret, { expiresIn: this.expiration });

  verify = (token: string) => jwt.verify(token, this.secret);
}

export default new Auth();
