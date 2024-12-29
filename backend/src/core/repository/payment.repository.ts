import { Payment, PaymentData } from 'powertube-shared'






export type PaymentDatabaseRepository = PromisifyMethods<{
    getAll(): Payment[]

    getById(paymentId: Payment['id']): Payment

    create(newPayment: Entity<Payment>): Payment

    update(id: Payment['id'], update: Pick<Payment, 'details' | 'status'>): boolean

    delete(id: Payment['id']): boolean
}>

export type PaymentApiRepository = PromisifyMethods<{
    initializePayment(payment: PaymentData): Promise<Pick<Payment, 'transactionId' | 'details'>>

    checkPayment(id: Payment['id']): Payment['status']

    cancelPayment(id: Payment['id']): boolean
}>
