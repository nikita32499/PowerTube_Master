import { TUserJwtData } from 'powertube-shared'

declare module 'express' {
    interface Request {
        userJwtData?: TUserJwtData
    }
}

export { }

