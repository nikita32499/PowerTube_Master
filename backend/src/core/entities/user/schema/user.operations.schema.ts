import { TUserCreate } from 'core/entities/user/types/user.operations'
import { Exactly, ZodSafe } from 'core/helpers/zod/zod'
import { z } from 'zod'

export const SchemaUserCreateRequest = ZodSafe(
    z.object({
        email: z.union([z.string(), z.null()]),
        password: z.union([z.string(), z.null()]),
    }),
).infer<Exactly<TUserCreate['Request']>>()
