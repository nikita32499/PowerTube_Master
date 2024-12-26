// export type TAuthOperation = {
// DtoAuthLogin: {
//     email: TUser['email'];
//     password: string;
// };
// DtoAuthSetAuth: {
//     id: TUser['id'];
//     email: TUser['email'];
//     password: string;
// };
//     DtoAuthSetRole: Pick<TUser, 'id' | 'role'>;
//     DtoAuthRegisterWithPassword: Pick<TUser, 'email'> & { password: string };
// };

import { User } from 'core/entities/user/user.entity'

export type TAuthLogin = {
    Request: {
        email: NonNullable<User['email']>
        password: string
    }
}

export type TAuthRegisterWithPassword = {
    Request: {
        email: NonNullable<User['email']>
        password: string
    }
}
