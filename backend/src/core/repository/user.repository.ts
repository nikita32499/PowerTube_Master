import { EnumUserRole, User } from 'powertube-shared'






export type UserAccessLevel = { role: EnumUserRole; jwtVersion: number }

export type UserDatabaseRepository =
    {
        usersAccessLevel: Record<User['id'], UserAccessLevel>

        getAll(): Promise<User[]>

        getOne(field: Partial<Pick<User, 'role' | 'email' | 'id'>>): Promise<User>

        delete(id: User['id']): Promise<boolean>

        update(id: User['id'], update: Partial<User>): Promise<boolean>

        create(data: Entity<User>): Promise<User>

        updateUserAccessLevel(): Promise<boolean>

        getUserAccessLevel(id: User['id']): UserAccessLevel


    }
