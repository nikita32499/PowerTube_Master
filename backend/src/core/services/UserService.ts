import { User } from 'core/entities/user/user.entity'
import { IUserService, UserDatabaseRepository } from 'core/entities/user/user.repository'

export class UserService implements IUserService {
    constructor(
        private readonly userDatabaseRepository: UserDatabaseRepository,
        // private readonly logger: LoggerRepository,
    ) { }

    create: IUserService['create'] = (data) => {
        const newUser = this.userDatabaseRepository.create(data)

        this.userDatabaseRepository.updateUserAccessLevel()

        return newUser
    };

    getAll: IUserService['getAll'] = () => {
        return this.userDatabaseRepository.getAll()
    };
    getById: IUserService['getById'] = (id) => {
        return this.userDatabaseRepository.getOne({ id })
    };

    delete: IUserService['delete'] = (id) => {
        return this.userDatabaseRepository.delete(id)
    };
    cancelJwt: IUserService['cancelJwt'] = async (id) => {
        const user = await this.userDatabaseRepository.getOne({ id })
        if (!user) {
            throw Error('Пользователь не найден')
        }
        const version = user.jwtVersion + 1

        return this.userDatabaseRepository.update(id, { jwtVersion: version })
    };

    setAuth: IUserService['setAuth'] = (userId, update) => {
        const emailBusy = Boolean(this.getByEmail(update.email))

        if (emailBusy) throw Error('Email занят')

        return this.userDatabaseRepository.update(userId, update)
    };

    setRole: IUserService['setRole'] = (userId, role) => {
        const result = this.userDatabaseRepository.update(userId, { role })

        this.userDatabaseRepository.updateUserAccessLevel()

        return result
    };

    updateLastAt: IUserService['updateLastAt'] = (id: User['id']) => {
        return this.userDatabaseRepository.update(id, { lastAt: Date.now() })
    };



    getByEmail: IUserService['getByEmail'] = (email) => {
        return this.userDatabaseRepository.getOne({ email })
    };

    getUserAccessLevel: IUserService['getUserAccessLevel'] = (id) => {
        return this.userDatabaseRepository.getUserAccessLevel(id)
    };
}
