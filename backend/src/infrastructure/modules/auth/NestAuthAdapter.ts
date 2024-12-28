import { Inject, Injectable } from '@nestjs/common'
import { AuthRepository } from 'core/entities/auth/auth.repository'
import { AuthService } from 'core/services/AuthService'
import { DI_TOKENS } from 'infrastructure/config/constants'
import { NestUserAdapter } from '../user/NestUserAdapter'

@Injectable()
export class NestAuthAdapter extends AuthService {
    constructor(
        userService: NestUserAdapter,

        @Inject(DI_TOKENS.AuthRepository) authRepository: AuthRepository,
    ) {
        super(userService, authRepository)
    }
}
