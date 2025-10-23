import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const user = (req as any).user;

    console.log('user', user);

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException('Admin role required');
    }

    return true;
  }
}