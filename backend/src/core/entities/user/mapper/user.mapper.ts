import { TUser, TUserClient } from '../types/user.entities';

export class UserMapper {
    static toClientFormat(user: TUser): TUserClient {
        return {
            id: user.id,
            createdAt: user.createdAt,
            lastAt: user.lastAt,
            subscription: user.subscription,
            proxy: user.proxy,
        };
    }
}
