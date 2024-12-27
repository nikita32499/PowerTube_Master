// import { Exactly, ZodSafe } from 'core/lib/zod/zod';
// import { z } from 'zod';
// import { EnumProxyType, TProxy } from '../types/proxy.entities';

import { Exactly, ZodSafe } from 'core/lib/zod/zod'
import { z } from 'zod'
import { Proxy, ProxyWorkerData } from '../proxy.entity'
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
        userId: z.union([z.string(), z.null()])
    }),
).infer<Exactly<Proxy>>()

export const SchemaProxyWorkerData = ZodSafe(z.object({
    type: z.nativeEnum(EnumProxyType),
    login: z.string(),
    password: z.string(),
    host: z.string(),
    port: z.number(),
    avail: z.boolean(),
    ip: z.string()
})).infer<Exactly<ProxyWorkerData>>()

export const SchemaGetConnectDataProxyResponse = z.object({
    ip: z.string()
})