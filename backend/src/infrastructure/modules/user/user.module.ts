import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DI_TOKENS } from 'infrastructure/libs/constants'
import { UserController } from 'infrastructure/modules/user/controllers/RestAPI/user.controller'
import { UserDB } from 'infrastructure/modules/user/db/user.typeorm'
import { UserRepositoryImpl } from 'infrastructure/modules/user/impl/UserRepositoryImpl'
import { NestUserAdapter } from "./NestUserAdapter"

@Module({
    imports: [TypeOrmModule.forFeature([UserDB])],
    controllers: [UserController],
    providers: [
        NestUserAdapter,

        {
            provide: DI_TOKENS.UserDatabaseRepository,
            useClass: UserRepositoryImpl,
        },
    ],
    exports: [NestUserAdapter],
})
export class UserModule { }
