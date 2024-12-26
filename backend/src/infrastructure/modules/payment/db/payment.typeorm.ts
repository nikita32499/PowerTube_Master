import { Payment, Subscription } from 'core/entities/payment/payment.entity'
import {
    EnumEnumPaymentType,
    EnumPaymentCurrency,
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    EnumSubscriptionStatus,

    TPaymentMethod,
    TSubscriptionTariff,
} from 'core/entities/payment/types/payment.types'
import { EntitySchemaTyped, TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs'
import { EntitySchema } from 'typeorm'

const methodSchema = new EntitySchemaTyped<TPaymentMethod>({
    name: 'method',

    columns: {
        currency: {
            type: 'enum',
            enum: EnumPaymentCurrency,
            nullable: false,
        },
        type: {
            type: 'enum',
            enum: EnumEnumPaymentType,
            nullable: false,
        },
    },
})

const tariffSchema = new EntitySchemaTyped<TSubscriptionTariff>({
    name: 'tariff',
    columns: {
        period: {
            type: 'enum',
            enum: EnumSubscriptionPeriod,
            nullable: false,
        },
        price: {
            type: 'jsonb',

            nullable: false,
        },
    },
})

export const PaymentDB = new EntitySchemaTyped<Payment, 'method' | 'tariff'>({
    name: 'Payment',
    tableName: 'payment',
    columns: {
        id: {
            type: 'varchar',
            primary: true,
            generated: 'uuid',
            nullable: false,
        },

        transactionId: {
            type: 'varchar',
            nullable: false,
        },
        status: {
            type: 'enum',
            enum: EnumPaymentStatus,
            nullable: false,
        },
        createdAt: {
            type: 'bigint',
            nullable: false,
            transformer: new TypeormLib.BigIntConverter(),
        },
        period: {
            type: 'enum',
            enum: EnumSubscriptionPeriod,
            nullable: false,
        },

        details: {
            type: 'text',
            nullable: true,
        },
        userId: {
            type: 'varchar',
            nullable: false,
        },
    },

    embeddeds: {
        method: {
            schema: methodSchema,
        },
        tariff: {
            schema: tariffSchema,
        },
    },
})

export const SubscriptionDB = new EntitySchema<Subscription>({
    name: 'Subscription',
    tableName: 'subscription',
    columns: {
        status: {
            type: 'enum',
            enum: EnumSubscriptionStatus,
            nullable: false,
        },
    },

    // embeddeds: {
    //     payments: {
    //         schema: PaymentDB,
    //         array: true,
    //     },
    // },

    // relations: {
    //     payments: {
    //         type: 'one-to-many',
    //         target: 'Payment',
    //     },
    // },
})
