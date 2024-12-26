import { Subscription } from 'core/entities/payment/payment.entity'
import { Proxy } from 'core/entities/proxy/proxy.entity'

import { EnumUserRole } from './types/user.types'





export class User {
    id: string
    authId: string
    passwordHash: string | null
    email: string | null
    role: EnumUserRole
    jwtVersion: number
    lastAt: number | null
    createdAt: number
    subscription: Subscription
    proxy: Proxy | null
    active: boolean

    constructor(userData: User) {
        this.id = userData.id
        this.authId = userData.authId
        this.email = userData.email
        this.passwordHash = userData.passwordHash
        this.role = userData.role
        this.jwtVersion = userData.jwtVersion
        this.lastAt = userData.lastAt
        this.createdAt = userData.createdAt
        this.subscription = new Subscription(userData.subscription)
        this.proxy = userData.proxy ? new Proxy(userData.proxy) : null
        this.active = userData.active
    }
}


export class UserJwtData {
    userId: User['id']
    version: number


    constructor(userData: UserJwtData) {
        this.userId = userData.userId
        this.version = userData.version
    }
}

export class UserClient implements Pick<
    User,
    'id' | 'createdAt' | 'lastAt' | 'subscription' | 'proxy'
> {
    id: string
    createdAt: number
    lastAt: number | null
    subscription: Subscription
    proxy: Proxy | null


    constructor(userData: UserClient) {
        this.id = userData.id
        this.createdAt = userData.createdAt
        this.lastAt = userData.lastAt
        this.subscription = userData.subscription
        this.proxy = userData.proxy
    }
}

