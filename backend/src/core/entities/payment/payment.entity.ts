import {
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    EnumSubscriptionStatus,
    TPayment,
    TPaymentMethod,
    TSubscription,
    TSubscriptionTariff,
} from 'core/entities/payment/types/payment.entities'

export class Payment implements TPayment {
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
    }: TPayment) {
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

export class Subscription implements TSubscription {
    status: EnumSubscriptionStatus
    payments: Payment[]
    constructor(dataSub: TSubscription) {
        this.status = dataSub.status
        this.payments = dataSub.payments.map((payment) => new Payment(payment))
    }
}
