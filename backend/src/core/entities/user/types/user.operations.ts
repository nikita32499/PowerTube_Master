import { TResponse } from 'core/lib/response.types'
import { TUser, TUserClient } from './user.entities'

export type TUserCreate = {
    Request: P<Pick<TUser, 'email'> & { password: string | null }>
    Entity: Omit<TUser, 'id'>
    Response: P<
        TResponse<{
            user: TUserClient
        }>
    >
}

export type TUserSetEmail = {
    Request: P<Pick<TUser, 'email' | 'id'>>
    Response: P<TResponse<{ user: TUserClient }>>
}

export type TUserSetAuth = {
    Request: { email: string; password?: string }
}
