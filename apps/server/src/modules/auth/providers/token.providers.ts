import { TOKENS_REPOSITORY } from '../../../core/constants'
import { Token } from '../entities/token.entity'

export const tokenProviders = [
  {
    provide: TOKENS_REPOSITORY,
    useValue: Token,
  },
]

export type TokenType = typeof Token
