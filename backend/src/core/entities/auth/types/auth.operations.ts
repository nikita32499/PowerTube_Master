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

import { TUser } from 'core/entities/user/types/user.entities'

export type TAuthLogin = {
    Request: {
        email: NonNullable<TUser['email']>
        password: string
    }
}

export type TAuthRegisterWithPassword = {
    Request: {
        email: NonNullable<TUser['email']>
        password: string
    }
}
