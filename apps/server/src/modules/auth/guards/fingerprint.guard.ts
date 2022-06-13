import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class FingerprintGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    if (request.headers['x-fingerprint']) {
      return true
    }

    return false
  }
}
