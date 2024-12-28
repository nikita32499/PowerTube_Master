
import { SchemaPayment } from 'core/entities/payment/schema/payment.schema'
import { EnumSubscriptionStatus, } from 'core/entities/payment/types/payment.types'
import { SchemaProxy } from 'core/entities/proxy/schema/proxy.schema'
import { Exactly, ZodSafe } from 'core/helpers/zod/zod'
import { z } from 'zod'
import { EnumUserRole } from '../types/user.types'
import { User, UserClient, UserJwtData } from '../user.entity'



export const SchemaUser = ZodSafe(
    z.object({
        id: z.string(),
        authId: z.string(),
        passwordHash: z.union([z.string(), z.null()]),
        email: z.union([z.string(), z.null()]),
        role: z.nativeEnum(EnumUserRole),
        jwtVersion: z.number(),
        lastAt: z.union([z.number(), z.null()]),
        createdAt: z.date(),
        status: z.nativeEnum(EnumSubscriptionStatus),
        payments: SchemaPayment.array(),
        proxy: z.union([z.null(), SchemaProxy]),
        active: z.boolean(),
    }),
).infer<Exactly<User>>()

export const SchemaUserJwtData = ZodSafe(
    z.object({
        userId: z.string(),
        version: z.number(),
    }),
).infer<Exactly<UserJwtData>>()

export const SchemaUserClient = ZodSafe(
    SchemaUser.pick({
        id: true,
        createdAt: true,
        lastAt: true,
        status: true,
        payments: true,
        proxy: true
    }),
).infer<Exactly<UserClient>>()
