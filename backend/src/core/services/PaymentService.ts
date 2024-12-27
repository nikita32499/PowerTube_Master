import { Payment } from 'core/entities/payment/payment.entity'
import {
    IPaymentService,
    PaymentApiRepository,
    PaymentDatabaseRepository,
} from 'core/entities/payment/payment.repository'
import { TPaymentCreate } from 'core/entities/payment/types/payment.operations'
import {
    EnumPaymentStatus,
    EnumSubscriptionTariffPrice,
} from 'core/entities/payment/types/payment.types'
import { User } from 'core/entities/user/user.entity'
import { UserService } from './UserService'

export class PaymentService implements IPaymentService {
    permissionsMap: Record<User['id'], Payment['id'][]> = {};

    constructor(
        private readonly userService: UserService,
        private readonly paymentDatabaseRepository: PaymentDatabaseRepository,
        private readonly paymentApiRepository: PaymentApiRepository,
    ) { }




    hasPermission: IPaymentService['hasPermission'] = (userId, paymentId) => {
        return this.permissionsMap[userId]?.includes(paymentId) ?? false
    };

    getAll(): Promise<Payment[]> {
        throw new Error('Method not implemented.')
    }

    startPayment: IPaymentService['startPayment'] = async (data) => {
        const user = await this.userService.getById(data.userId)

        if (!user) throw new Error('Пользователь не найден')

        let paymentCreateEntity: TPaymentCreate['Entity'] = {
            ...data,
            status: EnumPaymentStatus.PENDING,
            details: null,
            transactionId: 'undefined',
            tariff: {
                period: data.period,
                price: {
                    RUB: EnumSubscriptionTariffPrice[data.period] as any,
                },
            },
        }

        paymentCreateEntity =
            await this.paymentApiRepository.initializePayment(paymentCreateEntity)

        const newPayment =
            await this.paymentDatabaseRepository.create(paymentCreateEntity)

        return newPayment
    };

    getByPaymentId: IPaymentService['getByPaymentId'] = (paymentId) => {
        return this.paymentDatabaseRepository.getById(paymentId)
    };

    getPendingPaymentByUserId: IPaymentService['getPendingPaymentByUserId'] = async (
        userId,
    ) => {
        const user = await this.userService.getById(userId)

        if (!user) throw new Error('Пользователь не найден')

        const pendingPayments = user.payments.filter(
            (payment) => payment.status === EnumPaymentStatus.PENDING,
        )

        return pendingPayments
    };

    cancelPayment: IPaymentService['cancelPayment'] = async (paymentId) => {
        const cancelSuccess = await this.paymentApiRepository.cancelPayment(paymentId)

        if (cancelSuccess) {
            return await this.paymentDatabaseRepository.delete(paymentId)
        }
        return false
    };
}
