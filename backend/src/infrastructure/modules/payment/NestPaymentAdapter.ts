import { Inject, Injectable } from '@nestjs/common'
import {
    PaymentApiRepository,
    PaymentDatabaseRepository,
} from 'core/entities/payment/payment.repository'
import { PaymentService } from 'core/services/PaymentService'
import { DI_TOKENS } from 'infrastructure/config/constants'
import { NestUserAdapter } from '../user/NestUserAdapter'

@Injectable()
export class NestPaymentAdapter extends PaymentService {
    constructor(
        userService: NestUserAdapter,

        @Inject(DI_TOKENS.PaymentDatabaseRepository)
        paymentRepository: PaymentDatabaseRepository,

        @Inject(DI_TOKENS.PaymentApiImpl) paymentApiRepository: PaymentApiRepository,
    ) {
        super(userService, paymentRepository, paymentApiRepository)
    }
}
