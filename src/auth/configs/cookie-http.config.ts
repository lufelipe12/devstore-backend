import { CookieOptions } from 'express';

export abstract class CookieHttpConfig {
  private static readonly secure = process.env.APP_ENV == 'prod';
  private static readonly expires = +process.env.JWT_EXPIRATION;

  private static options: CookieOptions = {
    httpOnly: true,
    secure: this.secure,
    maxAge: +process.env.JWT_EXPIRATION * 1000,
    sameSite: this.secure ? 'none' : 'lax',
    domain: process.env.APP_ENV === 'prod' && process.env.DOMAIN_URL,
    path: '/',
  };

  public static Options(maxAge?: number): CookieOptions {
    if (maxAge) {
      return {
        ...this.options,
        maxAge,
      };
    } else {
      return {
        ...this.options,
        expires: new Date(new Date().getTime() + this.expires),
      };
    }
  }
}
