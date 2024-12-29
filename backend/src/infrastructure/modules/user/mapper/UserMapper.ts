import { User } from 'powertube-shared'

export class UserMapper {
    static toEntity = (user: User) => {
        return new User(user)
    };
}
