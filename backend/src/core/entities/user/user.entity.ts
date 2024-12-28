import { Payment } from 'core/entities/payment/payment.entity'
import { Proxy } from 'core/entities/proxy/proxy.entity'

import { EnumSubscriptionStatus } from '../payment/types/payment.types'
import { EnumUserRole } from './types/user.types'





export class User {
    id: string
    authId: string
    passwordHash: string | null
    email: string | null
    role: EnumUserRole
    jwtVersion: number
    lastAt: number | null
    createdAt: Date
    status: EnumSubscriptionStatus
    payments: Payment[]
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
        this.status = userData.status
        this.payments = userData.payments.map((payment) => new Payment(payment))
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
    'id' | 'createdAt' | 'lastAt' | 'status' | 'payments' | 'proxy'
> {
    id: string
    createdAt: Date
    lastAt: number | null
    status: EnumSubscriptionStatus
    payments: Payment[]
    proxy: Proxy | null


    constructor(userData: UserClient) {
        this.id = userData.id
        this.createdAt = userData.createdAt
        this.lastAt = userData.lastAt
        this.status = userData.status
        this.payments = userData.payments
        this.proxy = userData.proxy
    }
}

