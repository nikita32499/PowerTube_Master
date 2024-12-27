import { Payment } from 'core/entities/payment/payment.entity'
import {
    EnumEnumPaymentType,
    EnumPaymentCurrency,
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    TPaymentMethod,
    TSubscriptionTariff
} from 'core/entities/payment/types/payment.types'
import { TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs'
import { EntitySchemaTyped } from './../../../libs/typeorm/typeorm.libs'

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

