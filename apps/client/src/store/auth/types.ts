import { OptionsParams } from '../../api'

export interface LoginResponseThunkAPI {
  rejectValue: any
  extra: {
    $api: (url: string, data?: any, options?: OptionsParams) => Promise<Response>
  }
}

export interface CheckAuthThunkAPI extends LoginResponseThunkAPI {}
