import { PaymentApiRepository } from 'core/entities/payment/payment.repository'
import { EnumPaymentStatus } from 'core/entities/payment/types/payment.types'

export class PaymentApiImpl implements PaymentApiRepository {
    initializePayment: PaymentApiRepository['initializePayment'] = async (payment) => {
        return payment
    };

    checkPayment: PaymentApiRepository['checkPayment'] = async (id) => {
        console.log('checkPayment', id)
        return EnumPaymentStatus.PENDING
    };

    cancelPayment: PaymentApiRepository['cancelPayment'] = async (id) => {
        console.log('checkPayment', id)
        return true
    };
}
