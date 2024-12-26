import { Payment, PaymentClient } from 'core/entities/payment/payment.entity'

export class PaymentMapper {
    static toClientFormat(payment: Payment): PaymentClient {
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
