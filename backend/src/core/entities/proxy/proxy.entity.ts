import { EnumProxyType, TProxy } from 'core/entities/proxy/types/proxy.entities'

export class Proxy implements TProxy {
    id: string

    type: EnumProxyType
    login: string
    password: string
    ip: string
    host: string
    port: number
    avail: boolean
    constructor(proxyData: TProxy) {
        this.id = proxyData.id

        this.type = proxyData.type
        this.login = proxyData.login
        this.password = proxyData.password
        this.ip = proxyData.ip
        this.host = proxyData.host
        this.port = proxyData.port
        this.avail = proxyData.avail
    }
}
