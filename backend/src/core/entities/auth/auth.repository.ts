
import { User, UserJwtData } from '../user/user.entity'
import { TAuthLogin, TAuthRegisterWithPassword } from './types/auth.operations'




export type IAuthService = {
    registerWithPassword(data: TAuthRegisterWithPassword['Request']): Promise<User>

    login(data: TAuthLogin['Request']): Promise<User>

    register(): Promise<User>

    createUserToken(data: UserJwtData): Promise<string>

    validateToken(token: string): UserJwtData | null
}

export type AuthRepository = {
    cryptPassword(password: string): Promise<string>

    comparePassword(password: string, passwordHash: string): Promise<boolean>

    createUserToken(data: UserJwtData): Promise<string>

    validateToken(token: string): UserJwtData | null
}
