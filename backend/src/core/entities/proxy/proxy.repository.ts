import { User } from '../user/user.entity'
import { Proxy, ProxyWorkerData, TProxyDiagnosticData } from './proxy.entity'


export interface IProxyService {
    getProxyForUser(userId: User['id']): Promise<Proxy>
}



export interface ProxyDatabaseRepository {
    saveProxy(proxy: ProxyWorkerData): Promise<Proxy>
    deleteProxyById(id: string): Promise<boolean>
    getProxyById(id: string): Promise<Proxy>

    updateProxy(id: string, proxy: Partial<ProxyWorkerData>): Promise<boolean>

}

export interface ProxyCheckRepository {
    getConnectDataProxy(proxy: ProxyWorkerData): Promise<TProxyDiagnosticData>

}

export interface ProxyWorkerRepository {

    createProxy(ip: string): Promise<ProxyWorkerData>

    getAllProxy(ip: string): Promise<ProxyWorkerData[]>

    deleteProxy(ip: string, login: string): Promise<boolean>
}
