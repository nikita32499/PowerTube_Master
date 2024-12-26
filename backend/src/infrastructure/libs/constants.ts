export const DI_TOKENS = {
    PROXY_REPOSITORY: Symbol('PROXY_REPOSITORY'),
    UserDatabaseRepository: Symbol('UserDatabaseRepository'),
    PaymentApiImpl: Symbol('PaymentApiImpl'),
    PaymentDatabaseRepository: Symbol('PaymentDatabaseRepository'),
    AuthRepository: Symbol('AuthRepository'),
} as const


export enum ENUM_RABBIT_MQ_QUEUES {
    PAYMENT = 'PAYMENT',
    PROXY = 'PROXY',
    WORKER = 'WORKER',
}
