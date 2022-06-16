import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    if (request.headers['x-refresh-token']) {
      return true
    }

    return false
  }
}
