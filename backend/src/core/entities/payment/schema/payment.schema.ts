import { z } from 'zod'

import { Exactly, ZodSafe } from 'core/lib/zod/zod'
import {
    EnumEnumPaymentType,
    EnumPaymentCurrency,
    EnumPaymentStatus,
    EnumSubscriptionPeriod,
    EnumSubscriptionTariffPrice,
    TPayment,
    TPaymentClient,
    TSubscriptionTariff,
} from '../types/payment.entities'

export const SchemaSubscriptionTariff = ZodSafe(
    z.discriminatedUnion('period', [
        z.object({
            period: z.literal(EnumSubscriptionPeriod.Month1),
            price: z.object({
                [EnumPaymentCurrency.RUB]: z.literal(EnumSubscriptionTariffPrice.Month1),
            }),
        }),
        z.object({
            period: z.literal(EnumSubscriptionPeriod.Month3),
            price: z.object({
                [EnumPaymentCurrency.RUB]: z.literal(EnumSubscriptionTariffPrice.Month3),
            }),
        }),
        z.object({
            period: z.literal(EnumSubscriptionPeriod.Month6),
            price: z.object({
                [EnumPaymentCurrency.RUB]: z.literal(EnumSubscriptionTariffPrice.Month6),
            }),
        }),
        z.object({
            period: z.literal(EnumSubscriptionPeriod.Year1),
            price: z.object({
                [EnumPaymentCurrency.RUB]: z.literal(EnumSubscriptionTariffPrice.Year1),
            }),
        }),
    ]),
).infer<Exactly<TSubscriptionTariff>>()

export const SchemaPayment = ZodSafe(
    z.object({
        id: z.string(),
        transactionId: z.string(),
        userId: z.string(),
        status: z.nativeEnum(EnumPaymentStatus),
        tariff: SchemaSubscriptionTariff,
        createdAt: z.number(),
        method: z.object({
            currency: z.nativeEnum(EnumPaymentCurrency),
            type: z.nativeEnum(EnumEnumPaymentType),
        }),
        period: z.nativeEnum(EnumSubscriptionPeriod),
        details: z.union([z.string(), z.null()]),
    }),
).infer<Exactly<TPayment>>()

export const SchemaPaymentClient = ZodSafe(
    SchemaPayment.pick({
        id: true,
        status: true,
        createdAt: true,
        period: true,
        method: true,
        details: true,
    }),
).infer<Exactly<TPaymentClient>>()
