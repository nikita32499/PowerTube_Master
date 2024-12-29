import { PaymentApiRepository } from 'core/repository/payment.repository'
import { EnumPaymentStatus, PaymentData } from 'powertube-shared'

export class PaymentApiImpl implements PaymentApiRepository {
    initializePayment = async (payment: PaymentData) => {
        throw new Error('Not implemented', { cause: payment.userId })
    }

    checkPayment = async (id: string) => {
        console.log('checkPayment', id)
        return EnumPaymentStatus.PENDING
    }

    cancelPayment = async (id: string) => {
        throw new Error('Not implemented', { cause: id })
    }
}
