import { writeFileSync } from 'fs'
import { format } from 'date-fns'

export const customWriteLog = (writeObject: string) => {
  const d = new Date(),
    currentLogFile: string = format(d, 'yyyy-MM-dd'),
    currentDate = format(d, 'yyyy-MM-dd HH:mm:ss.SSS')

  writeFileSync(
    `${process.env.LOG_DIR}/error-${currentLogFile}.log`,
    '[' + currentDate + '] ' + writeObject + '\n',
    { flag: 'a' }
  )
}
