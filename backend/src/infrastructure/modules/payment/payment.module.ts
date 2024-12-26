import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DI_TOKENS } from 'infrastructure/libs/constants'
import { UserModule } from '../user/user.module'
import { PaymentController } from './controllers/RestAPI/payment.controller'
import { PaymentDB } from './db/payment.typeorm'
import { PaymentApiImpl } from './impl/PaymentApiImpl'
import { PaymentDatabaseRepositoryImpl } from './impl/PaymentDatabaseRepositoryImpl'
import { NestPaymentAdapter } from './NestPaymentAdapter'

@Module({
    imports: [TypeOrmModule.forFeature([PaymentDB]), forwardRef(() => UserModule)],
    controllers: [PaymentController],
    providers: [
        NestPaymentAdapter,
        {
            provide: DI_TOKENS.PaymentDatabaseRepository,
            useClass: PaymentDatabaseRepositoryImpl,
        },
        {
            provide: DI_TOKENS.PaymentApiImpl,
            useClass: PaymentApiImpl,
        },
    ],
})
export class PaymentModule { }
