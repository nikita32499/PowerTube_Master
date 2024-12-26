import { TPaymentCreate } from 'core/entities/payment/types/payment.operations'
import {
    EnumEnumPaymentType,
    EnumPaymentCurrency,
    EnumSubscriptionPeriod,
} from 'core/entities/payment/types/payment.types'
import { Exactly, ZodSafe } from 'core/lib/zod/zod'
import { z } from 'zod'

export const SchemaPaymentStartRequest = ZodSafe(
    z.object({
        method: z.object({
            type: z.nativeEnum(EnumEnumPaymentType),
            currency: z.nativeEnum(EnumPaymentCurrency),
        }),
        period: z.nativeEnum(EnumSubscriptionPeriod),
        userId: z.string(),
    }),
).infer<Exactly<TPaymentCreate['Request']>>()

// export const SchemaPaymentStartResponse = ZodSafe(
//     z.object({
//         response: z.discriminatedUnion('success', [
//             z.object({
//                 success: z.literal(true),
//                 data: ,
//             }),
//             z.object({
//                 success: z.literal(false),
//                 error: z.string(),
//             }),
//         ]),
//     }),
// ).infer<Exactly<TPaymentCreate['Response']>>();
