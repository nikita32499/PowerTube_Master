import { User, UserClient } from '../user.entity'

export class UserMapper {
    static toClientFormat(user: User): UserClient {
        return {
            id: user.id,
            createdAt: user.createdAt,
            lastAt: user.lastAt,
            status: user.status,
            payments: user.payments,
            proxy: user.proxy,
        }
    }
}
