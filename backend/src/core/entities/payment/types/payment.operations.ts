import { TPayment, TPaymentClient } from './payment.entities';

export type TPaymentCreate = P<{
    Request: P<Pick<TPayment, 'method' | 'period' | 'userId'>>;
    Entity: Omit<TPayment, 'id' | 'createdAt'>;
    Response: TPaymentClient;
}>;

export type TPaymentInitialize = {
    Entity: TPaymentCreate['Entity'];
};
