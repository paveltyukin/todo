import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context, status) {
    console.log(324234234)
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
