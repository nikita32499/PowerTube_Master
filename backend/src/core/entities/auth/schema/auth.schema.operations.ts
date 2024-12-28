import { Exactly, ZodSafe } from 'core/helpers/zod/zod'
import { z } from 'zod'
import { TAuthLogin, TAuthRegisterWithPassword } from '../types/auth.operations'

export const SchemaAuthRegisterWithPassword = ZodSafe(
    z.object({
        email: z.string().email(),
        password: z.string(),
    }),
).infer<Exactly<TAuthRegisterWithPassword['Request']>>()

export const SchemaAuthLogin = ZodSafe(
    z.object({
        email: z.string().email(),
        password: z.string(),
    }),
).infer<Exactly<TAuthLogin['Request']>>()
