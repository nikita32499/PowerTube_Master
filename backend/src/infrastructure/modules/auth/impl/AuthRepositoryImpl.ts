import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { AuthRepository } from 'core/entities/auth/auth.repository'
import { SchemaUserJwtData } from 'core/entities/user/schema/user.schema'
import { UserJwtData } from 'core/entities/user/user.entity'
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

    async createUserToken(data: UserJwtData): Promise<string> {
        return jwt.sign(data, Config.JWT_SECRET_KEY, {
            expiresIn: '24h',
            algorithm: 'HS512',
        })
    }

    validateToken: AuthRepository['validateToken'] = (token: string) => {
        try {
            const decoded = jwt.verify(token, Config.JWT_SECRET_KEY, { complete: true })
            return SchemaUserJwtData.parse(decoded.payload)
        } catch {
            return null
        }
    };
}
