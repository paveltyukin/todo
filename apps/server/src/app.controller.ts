import { Controller, Post } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

@Controller()
export class AppController {
  @Post('generate-bcrypt')
  async getBcrypt() {
    const salt = await bcrypt.genSalt(Number(process.env.GEN_SALT))
    return bcrypt.hash('1', salt)
  }
}
