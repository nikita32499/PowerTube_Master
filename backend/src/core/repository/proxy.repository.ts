import { Proxy, ProxyCredentials, TProxyDiagnosticData, User } from 'powertube-shared'


export interface IProxyService {
    getProxyForUser(userId: User['id']): Promise<Proxy>
}



export interface ProxyDatabaseRepository {
    saveProxy(proxy: ProxyCredentials): Promise<Proxy>
    deleteProxyById(id: string): Promise<boolean>
    getProxyById(id: string): Promise<Proxy>

    updateProxy(id: string, proxy: Partial<ProxyCredentials>): Promise<boolean>

}

export interface ProxyCheckRepository {
    getConnectDataProxy(proxy: ProxyCredentials): Promise<TProxyDiagnosticData>

}

export interface ProxyProducerRepository {

    createProxy(host: string): Promise<ProxyCredentials>

    getAllProxy(host: string): Promise<ProxyCredentials[]>

    deleteProxy(host: string, login: string): Promise<boolean>
}
