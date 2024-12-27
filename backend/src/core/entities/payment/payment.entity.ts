import { EnumPaymentStatus, EnumSubscriptionPeriod, TSubscriptionTariff } from './types/payment.types'

import { TPaymentMethod } from './types/payment.types'




export class Payment {
    id: string
    transactionId: string
    userId: string
    status: EnumPaymentStatus
    createdAt: number
    method: TPaymentMethod
    period: EnumSubscriptionPeriod
    tariff: TSubscriptionTariff
    details: string | null
    constructor({
        id,
        transactionId,
        userId,
        status,
        createdAt,
        method,
        period,
        details,
        tariff,
    }: Payment) {
        this.id = id
        this.transactionId = transactionId
        this.userId = userId
        this.status = status
        this.createdAt = createdAt
        this.method = method
        this.period = period
        this.tariff = tariff
        this.details = details
    }
}



export class PaymentClient implements Pick<
    Payment,
    'id' | 'status' | 'createdAt' | 'period' | 'method' | 'details'
> {
    id: string
    status: EnumPaymentStatus
    createdAt: number
    period: EnumSubscriptionPeriod
    method: TPaymentMethod
    details: string | null


    constructor(data: PaymentClient) {
        this.id = data.id
        this.status = data.status
        this.createdAt = data.createdAt
        this.period = data.period
        this.method = data.method
        this.details = data.details
    }
}
