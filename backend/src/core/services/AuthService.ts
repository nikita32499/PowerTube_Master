import { AuthRepository, IAuthService } from 'core/entities/auth/auth.repository'

import { EnumSubscriptionStatus } from 'core/entities/payment/types/payment.types'
import { UserLib } from 'core/entities/user/helper/user'
import { TUserCreate } from 'core/entities/user/types/user.operations'
import { EnumUserRole } from 'core/entities/user/types/user.types'
import { UserService } from './UserService'

export class AuthService implements IAuthService {
    constructor(
        private readonly userService: UserService,
        private readonly authRepository: AuthRepository,

        // private readonly logger: LoggerRepository,
    ) { }

    login: IAuthService['login'] = async (data) => {
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

    registerWithPassword: IAuthService['registerWithPassword'] = async (data) => {
        const user = await this.userService.getByEmail(data.email)

        if (user) throw Error('Email занят')

        const createData: TUserCreate['Entity'] = {
            authId: UserLib.generateAuthId(),
            email: data.email,
            passwordHash: await this.authRepository.cryptPassword(data.password),
            role: EnumUserRole.USER,
            status: EnumSubscriptionStatus.TRIALING,
            payments: [],
            createdAt: Date.now(),
            lastAt: null,
            jwtVersion: 0,
            active: true,
            proxy: null,
        }

        const newUser = await this.userService.create(createData)

        return newUser
    };

    register: IAuthService['register'] = async () => {
        const createData: TUserCreate['Entity'] = {
            authId: UserLib.generateAuthId(),
            email: null,
            passwordHash: null,
            role: EnumUserRole.USER,
            status: EnumSubscriptionStatus.TRIALING,
            payments: [],
            createdAt: Date.now(),
            lastAt: null,
            jwtVersion: 0,
            active: true,
            proxy: null,
        }

        const newUser = await this.userService.create(createData)

        return newUser
    };

    createUserToken: IAuthService['createUserToken'] = (data) => {
        return this.authRepository.createUserToken(data)
    };

    validateToken: IAuthService['validateToken'] = (token) => {
        return this.authRepository.validateToken(token)
    };
}
