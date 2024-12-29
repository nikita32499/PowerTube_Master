export const DI_TOKENS = {
    WORKER: {
        DATABASE: Symbol('WORKER_NODE_DATABASE'),
    },
    PROXY: {
        DATABASE: Symbol('PROXY_DATABASE'),
        PRODUCER: Symbol('PROXY_PRODUCER'),
        CHECK: Symbol('PROXY_CHECK_REPOSITORY'),
    },
    UserDatabaseRepository: Symbol('UserDatabaseRepository'),
    PaymentApiImpl: Symbol('PaymentApiImpl'),
    PaymentDatabaseRepository: Symbol('PaymentDatabaseRepository'),
    AuthRepository: Symbol('AuthRepository'),
} as const


export enum ENUM_RABBIT_MQ_QUEUES {
    MASTER = 'MASTER',
}