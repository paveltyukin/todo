import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class FingerprintGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    if (request.cookies?.fingerprint) {
      return true
    }

    return false
  }
}
