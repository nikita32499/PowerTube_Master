import { Payment, PaymentClient } from 'core/entities/payment/payment.entity'

export type TPaymentCreate = P<{
    Request: P<Pick<Payment, 'method' | 'period' | 'userId'>>
    Entity: Omit<Payment, 'id' | 'createdAt'>
    Response: PaymentClient
}>

export type TPaymentInitialize = {
    Entity: TPaymentCreate['Entity']
}
