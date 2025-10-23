import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log(`${request.method} ${request.originalUrl}`, {
      auth: request.headers['authorization'],
    });

    const token = (request.headers['api-token'] as string) || null;

    console.log('token=', token);

    if (!token) {
      throw new UnauthorizedException('API token missing');
    }

    if (token === 'admin-token') {
      (request as any).user = { role: 'admin', permissions: ['read','write','delete'] };
      return next();
    }

    if (token === 'user-token') {
      (request as any).user = { role: 'user', permissions: ['read'] };
      return next();
    }

    throw new UnauthorizedException('Invalid API token');
  }
}
