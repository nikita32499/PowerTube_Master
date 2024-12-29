import { Inject, Injectable } from '@nestjs/common'
import { AuthRepository } from 'core/repository/auth.repository'
import { DI_TOKENS } from 'infrastructure/config/constants'
import { AuthData, UserFactory, UserJwtData } from 'powertube-shared'
import { NestUserAdapter } from '../user/NestUserAdapter'

@Injectable()
export class NestAuthAdapter {
    constructor(
        private readonly userService: NestUserAdapter,

        @Inject(DI_TOKENS.AuthRepository) private readonly authRepository: AuthRepository,
    ) {
    }


    login = async (data: AuthData) => {
        const user = await this.userService.getByEmail(data.email)
        if (!user || !user.passwordHash) {
            throw Error('Не правильный логин или пароль')
        }

        const compareResult = await this.authRepository.comparePassword(
            data.password,
            user.passwordHash,
        )

        if (!compareResult) {
            throw Error('Не правильный логин или пароль')
        }

        return user
    };

    registerWithPassword = async (data: AuthData) => {
        const user = await this.userService.getByEmail(data.email)

        if (user) throw Error('Email занят')

        const createData = await UserFactory.createUserEntityWithAuth(data, async () => {
            return await this.authRepository.cryptPassword(data.password)
        })

        const newUser = await this.userService.create(createData)

        return newUser
    };

    register = async () => {
        const createData = UserFactory.createUserEntity()

        const newUser = await this.userService.create(createData)

        return newUser
    };

    createUserToken = (data: UserJwtData) => {
        return this.authRepository.createUserToken(data)
    };

    validateToken = (token: string) => {
        return this.authRepository.validateToken(token)
    };
}
