import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value
    }

    const object = plainToInstance(metatype, value)
    const errors = await validate(object)

    if (errors.length > 0) {
      let message

      if (errors[0].constraints) {
        const values = Object.values(errors[0].constraints)
        message = values[0]
      } else {
        message = errors[0]
      }

      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message,
        },
        HttpStatus.FORBIDDEN
      )
    }

    return value
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private static toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
