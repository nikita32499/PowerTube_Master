import { Inject, Injectable } from '@nestjs/common'
import { UserDatabaseRepository } from 'core/repository/user.repository'
import { DI_TOKENS } from 'infrastructure/config/constants'
import { AuthData, EnumUserRole, User } from 'powertube-shared'
@Injectable()
export class NestUserAdapter {
    constructor(
        @Inject(DI_TOKENS.UserDatabaseRepository) private readonly userDatabaseRepository: UserDatabaseRepository,
    ) {

    }

    create = async (data: Entity<User>) => {
        const newUser = this.userDatabaseRepository.create(data)

        this.userDatabaseRepository.updateUserAccessLevel()

        return newUser
    };

    getAll = () => {
        return this.userDatabaseRepository.getAll()
    };
    getById = (id: string) => {
        return this.userDatabaseRepository.getOne({ id })
    };

    delete = (id: string) => {
        return this.userDatabaseRepository.delete(id)
    };
    cancelJwt = async (id: string) => {
        const user = await this.userDatabaseRepository.getOne({ id })
        if (!user) {
            throw Error('Пользователь не найден')
        }
        const version = user.jwtVersion + 1

        return this.userDatabaseRepository.update(id, { jwtVersion: version })
    };

    setAuth = async (userId: string, update: AuthData) => {
        const emailBusy = Boolean(await this.getByEmail(update.email))

        if (emailBusy) throw Error('Email занят')

        return this.userDatabaseRepository.update(userId, update)
    };

    setRole = (userId: string, role: EnumUserRole) => {
        const result = this.userDatabaseRepository.update(userId, { role })

        this.userDatabaseRepository.updateUserAccessLevel()

        return result
    };

    updateLastAt = (userId: string) => {
        return this.userDatabaseRepository.update(userId, { lastAt: new Date() })
    };



    getByEmail = (email: string) => {
        return this.userDatabaseRepository.getOne({ email })
    };

    getUserAccessLevel = (id: string) => {
        return this.userDatabaseRepository.getUserAccessLevel(id)
    };
}
