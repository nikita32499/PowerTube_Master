import { EnumProxyStatus, EnumProxyType } from 'core/entities/proxy/types/proxy.types'




export class ProxyWorkerData {


    type: EnumProxyType
    login: string
    password: string
    host: string
    port: number
    avail: boolean
    ip: string
    constructor(proxyData: ProxyWorkerData) {


        this.type = proxyData.type
        this.login = proxyData.login
        this.password = proxyData.password
        this.ip = proxyData.ip
        this.host = proxyData.host
        this.port = proxyData.port
        this.avail = proxyData.avail
    }
}



export class Proxy extends ProxyWorkerData {
    id: string
    userId: string | null

    constructor(proxyData: Proxy) {
        super(proxyData)
        this.id = proxyData.id
        this.userId = proxyData.userId
    }
}

export type TProxyDiagnosticData = {
    delay: number


    statusCode: number
    proxy: ProxyWorkerData



} & ({
    status: EnumProxyStatus.CONNECTED
    ip: string
} | {
    status: EnumProxyStatus.DISCONNECTED | EnumProxyStatus.ERROR
    ip: null | string
    error: string
})

