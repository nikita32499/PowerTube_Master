
import { UserJwtData } from 'powertube-shared'




export type AuthRepository = {
    cryptPassword(password: string): Promise<string>

    comparePassword(password: string, passwordHash: string): Promise<boolean>

    createUserToken(data: UserJwtData): Promise<string>

    validateToken(token: string): UserJwtData | null
}
