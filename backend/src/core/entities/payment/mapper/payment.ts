import { Payment } from 'core/entities/payment/payment.entity'
import { TPaymentClient } from '../types/payment.entities'

export class PaymentMapper {
    static toClientFormat(payment: Payment): TPaymentClient {
        return {
            id: payment.id,
            status: payment.status,
            createdAt: payment.createdAt,
            period: payment.period,
            method: payment.method,
            details: payment.details,
        }
    }
}
