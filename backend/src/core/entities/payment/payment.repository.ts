import { Payment } from 'core/entities/payment/payment.entity'
import { TPaymentCreate } from 'core/entities/payment/types/payment.operations'
import { User } from '../user/user.entity'




export type IPaymentService = {
    permissionsMap: Record<User['id'], Payment['id'][]>

    hasPermission(userId: User['id'], paymentId: Payment['id']): boolean

    getAll(): Promise<Payment[]>

    startPayment(data: TPaymentCreate['Request']): Promise<Payment>

    getByPaymentId(paymentId: Payment['id']): Promise<Payment>

    getPendingPaymentByUserId(userId: User['id']): Promise<Payment[]>

    cancelPayment(paymentId: Payment['id']): Promise<boolean>
}


export type PaymentDatabaseRepository = PromisifyMethods<{
    getAll(): Payment[]

    getById(paymentId: Payment['id']): Payment

    create(newPayment: TPaymentCreate['Entity']): Payment

    update(id: Payment['id'], update: Pick<Payment, 'details' | 'status'>): boolean

    delete(id: Payment['id']): boolean
}>

export type PaymentApiRepository = PromisifyMethods<{
    initializePayment(payment: TPaymentCreate['Entity']): TPaymentCreate['Entity']

    checkPayment(id: Payment['id']): Payment['status']

    cancelPayment(id: Payment['id']): boolean
}>
