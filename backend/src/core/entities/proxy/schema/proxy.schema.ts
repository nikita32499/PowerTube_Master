// import { Exactly, ZodSafe } from 'core/lib/zod/zod';
// import { z } from 'zod';
// import { EnumProxyType, TProxy } from '../types/proxy.entities';

import { Exactly, ZodSafe } from 'core/lib/zod/zod'
import { z } from 'zod'
import { Proxy } from '../proxy.entity'
import { EnumProxyType } from '../types/proxy.types'
export const SchemaProxy = ZodSafe(
    z.object({
        id: z.string(),
        type: z.nativeEnum(EnumProxyType),
        login: z.string(),
        password: z.string(),
        ip: z.string(),
        host: z.string(),
        port: z.number(),
        avail: z.boolean(),
    }),
).infer<Exactly<Proxy>>()



export const SchemaGetConnectDataProxyResponse = z.object({
    ip: z.string()
})