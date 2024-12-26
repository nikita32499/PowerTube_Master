import { TUserJwtData } from 'core/entities/user/types/user.entities'

declare module 'express' {
    interface Request {
        userJwtData?: TUserJwtData
    }
}

export { }

