import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { AuthRepository } from 'core/entities/auth/auth.repository'
import { TUserJwtData } from 'core/entities/user/types/user.entities'
import { Config } from 'infrastructure/libs/config'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
    constructor() { }
    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
    async cryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(12)
        return await bcrypt.hash(password, salt)
    }

    async createUserToken(data: TUserJwtData): Promise<string> {
        return jwt.sign(data, Config.JWT_SECRET_KEY, {
            expiresIn: '24h',
            algorithm: 'RS256',
        })
    }

    validateToken: AuthRepository['validateToken'] = (token: string) => {
        try {
            const decoded = jwt.verify(token, Config.JWT_SECRET_KEY, { complete: true })
            return decoded.payload as TUserJwtData
        } catch {
            return null
        }
    };
}
