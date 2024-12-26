import { Payment } from 'core/entities/payment/payment.entity'
import { TPayment } from 'core/entities/payment/types/payment.entities'
import { TPaymentCreate } from 'core/entities/payment/types/payment.operations'



import { TUser } from 'core/entities/user/types/user.entities'

export type IPaymentService = {
    permissionsMap: Record<TUser['id'], TPayment['id'][]>

    hasPermission(userId: TUser['id'], paymentId: TPayment['id']): boolean

    getAll(): Promise<Payment[]>

    startPayment(data: TPaymentCreate['Request']): Promise<Payment>

    getByPaymentId(paymentId: TPayment['id']): Promise<Payment>

    getPendingPaymentByUserId(userId: TUser['id']): Promise<Payment[]>

    cancelPayment(paymentId: TPayment['id']): Promise<boolean>
}


export type PaymentDatabaseRepository = PromisifyMethods<{
    getAll(): Payment[]

    getById(paymentId: TPayment['id']): Payment

    create(newPayment: TPaymentCreate['Entity']): Payment

    update(id: TPayment['id'], update: Pick<TPayment, 'details' | 'status'>): boolean

    delete(id: TPayment['id']): boolean
}>

export type PaymentApiRepository = PromisifyMethods<{
    initializePayment(payment: TPaymentCreate['Entity']): TPaymentCreate['Entity']

    checkPayment(id: TPayment['id']): TPayment['status']

    cancelPayment(id: TPayment['id']): boolean
}>
