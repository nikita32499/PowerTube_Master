import { TResponse } from 'core/helpers/response.types'
import { User, UserClient } from '../user.entity'

export type TUserCreate = {
    Request: P<Pick<User, 'email'> & { password: string | null }>
    Entity: Omit<User, 'id'>
    Response: P<
        TResponse<{
            user: UserClient
        }>
    >
}

export type TUserSetEmail = {
    Request: P<Pick<User, 'email' | 'id'>>
    Response: P<TResponse<{ user: UserClient }>>
}

export type TUserSetAuth = {
    Request: { email: string; password?: string }
}
