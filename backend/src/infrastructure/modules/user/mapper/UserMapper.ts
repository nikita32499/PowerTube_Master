import { User } from 'core/entities/user/user.entity'

export class UserMapper {
    static toEntity = (user: User) => {
        return new User(user)
    };
}
