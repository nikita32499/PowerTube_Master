import { Proxy } from './proxy.entity'


export type IProxyService = {
    createProxy(): Proxy
    checkProxy(proxy: Proxy): boolean
}



export interface ProxyRepository {
    createProxy(): Proxy
    checkProxy(proxy: Proxy): boolean
}
