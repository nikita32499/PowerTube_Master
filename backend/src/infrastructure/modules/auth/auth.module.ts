import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DI_TOKENS } from 'infrastructure/config/constants'
import { AuthController } from 'infrastructure/modules/auth/controllers/RestAPI/auth.controller'
import { AuthRepositoryImpl } from 'infrastructure/modules/auth/impl/AuthRepositoryImpl'
import { NestAuthAdapter } from 'infrastructure/modules/auth/NestAuthAdapter'
import { UserDB } from 'infrastructure/modules/user/db/user.typeorm'
import { UserModule } from '../user/user.module'

@Module({
    imports: [TypeOrmModule.forFeature([UserDB]), UserModule],
    controllers: [AuthController],
    providers: [
        NestAuthAdapter,
        {
            provide: DI_TOKENS.AuthRepository,
            useClass: AuthRepositoryImpl,
        },
    ],
    exports: [NestAuthAdapter],
})
export class AuthModule { }
