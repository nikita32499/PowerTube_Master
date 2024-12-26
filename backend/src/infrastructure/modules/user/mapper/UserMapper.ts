import { TUser } from 'core/entities/user/types/user.entities'
import { User } from 'core/entities/user/user.entity'

export class UserMapper {
    static toEntity = (user: TUser) => {
        return new User(user)
    };
}
