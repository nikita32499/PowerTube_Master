import { TUserCreate, TUserSetAuth } from 'core/entities/user/types/user.operations'
import { EnumUserRole } from 'core/entities/user/types/user.types'
import { User } from 'core/entities/user/user.entity'




export type IUserService =
    {
        create(data: TUserCreate['Entity']): Promise<User>

        updateLastAt(userId: User['id']): Promise<boolean>

        // setAuth(data: TAuthOperation['DtoAuthSetAuth']): boolean;

        // setEmail(data: TUserSetEmail['Request']): boolean;

        setAuth(userId: User['id'], data: TUserSetAuth['Request']): Promise<boolean>

        setRole(userID: User['id'], role: EnumUserRole): Promise<boolean>

        cancelJwt(userId: User['id']): Promise<boolean>

        delete(userId: User['id']): Promise<boolean>

        getByEmail(email: User['email']): Promise<User>

        getById(userId: User['id']): Promise<User>

        getAll(): Promise<User[]>

        getUserAccessLevel(userId: User['id']): UserAccessLevel
    }


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
