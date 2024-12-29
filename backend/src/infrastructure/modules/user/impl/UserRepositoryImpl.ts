import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDatabaseRepository } from 'core/repository/user.repository'
import { TypeormLib } from 'infrastructure/common/helpers/typeorm/typeorm.libs'
import { EnumUserRole, User } from 'powertube-shared'
import { Repository } from 'typeorm'
import { UserDB } from '../db/user.typeorm'
import { UserMapper } from '../mapper/UserMapper'

@Injectable()
export class UserRepositoryImpl implements UserDatabaseRepository {
    usersAccessLevel: Record<User['id'], { role: EnumUserRole; jwtVersion: number }> =
        {};

    constructor(
        @InjectRepository(UserDB)
        private readonly userDB: Repository<User>,
    ) {
        this.updateUserAccessLevel()
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.userDB.softDelete(id)

        return TypeormLib.isAffectedSuccess(result)
    }
    async update(id: string, update: Partial<User>): Promise<boolean> {
        const result = await this.userDB.update(id, update)
        return TypeormLib.isAffectedSuccess(result)
    }
    async create(data: Entity<User>): Promise<User> {
        const newUserData = await this.userDB.create(data)

        const newUser = await this.userDB.save(newUserData)

        return UserMapper.toEntity(newUser)
    }
    getUser(id: string): { role: EnumUserRole; jwtVersion: number } {
        const accessLevel = this.usersAccessLevel[id]
        if (!accessLevel) throw Error('Пользователь не найден')
        return accessLevel
    }

    async getAll() {
        const users = await this.userDB.find({ withDeleted: true, relations: { proxy: true } })
        return users.map((user) => UserMapper.toEntity(user))
    }
    getOne: UserDatabaseRepository['getOne'] = async (field) => {
        const whereOption = TypeormLib.whereOptionMapper(field)

        const user = await this.userDB.findOne({ where: whereOption })

        if (!user) throw Error('Пользователь не найден')

        return UserMapper.toEntity(user)
    };

    getUserAccessLevel(id: string): { role: EnumUserRole; jwtVersion: number } {
        const accessLevel = this.usersAccessLevel[id]
        if (!accessLevel) throw Error('Пользователь не найден')
        return accessLevel
    }

    async updateUserAccessLevel(): Promise<boolean> {
        const usersList = await this.getAll()
        for (const user of usersList) {
            this.usersAccessLevel[user.id] = {
                role: user.role,
                jwtVersion: user.jwtVersion,
            }
        }
        return true
    }
}
