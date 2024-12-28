import { Inject, Injectable } from '@nestjs/common'
import { UserDatabaseRepository } from 'core/entities/user/user.repository'
import { UserService } from 'core/services/UserService'
import { DI_TOKENS } from 'infrastructure/config/constants'
@Injectable()
export class NestUserAdapter extends UserService {
    constructor(
        @Inject(DI_TOKENS.UserDatabaseRepository) userRepository: UserDatabaseRepository,
    ) {
        super(userRepository)
    }
}
