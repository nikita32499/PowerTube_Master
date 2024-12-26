import { TUserJwtData } from '../user/types/user.entities'
import { User } from '../user/user.entity'
import { TAuthLogin, TAuthRegisterWithPassword } from './types/auth.operations'




export type IAuthService = {
    registerWithPassword(data: TAuthRegisterWithPassword['Request']): Promise<User>

    login(data: TAuthLogin['Request']): Promise<User>

    register(): Promise<User>

    createUserToken(data: TUserJwtData): Promise<string>

    validateToken(token: string): TUserJwtData | null
}

export type AuthRepository = {
    cryptPassword(password: string): Promise<string>

    comparePassword(password: string, passwordHash: string): Promise<boolean>

    createUserToken(data: TUserJwtData): Promise<string>

    validateToken(token: string): TUserJwtData | null
}
