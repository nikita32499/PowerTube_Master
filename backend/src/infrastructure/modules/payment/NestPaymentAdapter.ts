import { Inject, Injectable } from '@nestjs/common'
import { PaymentApiRepository, PaymentDatabaseRepository } from 'core/repository/payment.repository'
import { DI_TOKENS } from 'infrastructure/config/constants'
import { EnumPaymentStatus, Payment, PaymentData, PaymentFactory, User } from 'powertube-shared'
import { NestUserAdapter } from '../user/NestUserAdapter'

@Injectable()
export class NestPaymentAdapter {
    constructor(
        private readonly userService: NestUserAdapter,

        @Inject(DI_TOKENS.PaymentDatabaseRepository)
        private readonly paymentDatabaseRepository: PaymentDatabaseRepository,

        @Inject(DI_TOKENS.PaymentApiImpl) private readonly paymentApiRepository: PaymentApiRepository,
    ) {

    }
    permissionsMap: Record<User['id'], Payment['id'][]> = {};

    hasPermission(userId: string, paymentId: string): boolean {
        return this.permissionsMap[userId]?.includes(paymentId) ?? false
    };

    getAll(): Promise<Payment[]> {
        throw new Error('Method not implemented.')
    }

    startPayment = async (data: PaymentData) => {
        const user = await this.userService.getById(data.userId)

        if (!user) throw new Error('Пользователь не найден')

        let paymentCreateEntity = await PaymentFactory.createPaymentEntity(data, async () => {
            return await this.paymentApiRepository.initializePayment(data)
        })


        const newPayment =
            await this.paymentDatabaseRepository.create(paymentCreateEntity)

        return newPayment
    };

    getByPaymentId = (paymentId: string) => {
        return this.paymentDatabaseRepository.getById(paymentId)
    };

    getPendingPaymentByUserId = async (
        userId: string,
    ) => {
        const user = await this.userService.getById(userId)

        if (!user) throw new Error('Пользователь не найден')

        const pendingPayments = user.payments.filter(
            (payment) => payment.status === EnumPaymentStatus.PENDING,
        )

        return pendingPayments
    };

    cancelPayment = async (paymentId: string) => {
        const cancelSuccess = await this.paymentApiRepository.cancelPayment(paymentId)

        if (cancelSuccess) {
            return await this.paymentDatabaseRepository.delete(paymentId)
        }
        return false
    };
}
