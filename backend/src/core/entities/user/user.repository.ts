import { EnumUserRole } from 'core/entities/user/types/user.entities'
import { TUserCreate, TUserSetAuth } from 'core/entities/user/types/user.operations'
import { User } from 'core/entities/user/user.entity'




export type IUserService = PromisifyMethods<
    {
        create(data: TUserCreate['Entity']): User

        updateLastAt(userId: User['id']): boolean

        // setAuth(data: TAuthOperation['DtoAuthSetAuth']): boolean;

        // setEmail(data: TUserSetEmail['Request']): boolean;

        setAuth(userId: User['id'], data: TUserSetAuth['Request']): boolean

        setRole(userID: User['id'], role: EnumUserRole): boolean

        cancelJwt(userId: User['id']): boolean

        delete(userId: User['id']): boolean

        getByEmail(email: User['email']): User

        getById(userId: User['id']): User

        getAll(): User[]

        getUserAccessLevel(userId: User['id']): UserAccessLevel
    },
    'getUserAccessLevel'
>


export type UserAccessLevel = { role: EnumUserRole; jwtVersion: number }

export type UserDatabaseRepository = PromisifyMethods<
    {
        usersAccessLevel: Record<User['id'], UserAccessLevel>

        getAll(): User[]

        getOne(field: Partial<Pick<User, 'role' | 'email' | 'id'>>): User

        delete(id: User['id']): boolean

        update(id: User['id'], update: Partial<User>): boolean

        create(data: TUserCreate['Entity']): User

        getUserAccessLevel(id: User['id']): UserAccessLevel

        updateUserAccessLevel(): boolean
    },
    'getUserAccessLevel'
>
