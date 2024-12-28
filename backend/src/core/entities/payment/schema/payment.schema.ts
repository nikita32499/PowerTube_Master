import { z } from 'zod'


import { Exactly, ZodSafe } from 'core/helpers/zod/zod'
import {
    EnumEnumPaymentType,
    EnumPaymentCurrency,
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    TSubscriptionTariff
} from '../types/payment.types'


import { Payment, PaymentClient } from '../payment.entity'

export const SchemaSubscriptionTariff = ZodSafe(
    z.object({
        period: z.nativeEnum(EnumSubscriptionPeriod),
        price: z.number(),
    }),
).infer<Exactly<TSubscriptionTariff>>()

export const SchemaPayment = ZodSafe(
    z.object({
        id: z.string(),
        transactionId: z.string(),
        userId: z.string(),
        status: z.nativeEnum(EnumPaymentStatus),
        tariff: SchemaSubscriptionTariff,
        createdAt: z.date(),
        method: z.object({
            currency: z.nativeEnum(EnumPaymentCurrency),
            type: z.nativeEnum(EnumEnumPaymentType),
        }),
        period: z.nativeEnum(EnumSubscriptionPeriod),
        details: z.union([z.object({}), z.null()]),
    }),
).infer<Exactly<Payment>>()

export const SchemaPaymentClient = ZodSafe(
    SchemaPayment.pick({
        id: true,
        status: true,
        createdAt: true,
        period: true,
        method: true,
        details: true,
    }),
).infer<Exactly<PaymentClient>>()
