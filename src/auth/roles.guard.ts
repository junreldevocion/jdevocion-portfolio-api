import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { RequestWithUser } from './interfaces/request-with-user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    console.log('Decoded user in RolesGuard:', user);
    if (!user || !user.role) {
      throw new ForbiddenException('User role is missing or invalid.');
    }

    return requireRoles.includes(user.role);
  }
}
