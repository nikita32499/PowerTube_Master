import { Proxy } from 'core/entities/proxy/proxy.entity'
import { IProxyService, ProxyRepository } from 'core/entities/proxy/proxy.repository'





export class ProxyService implements IProxyService {
	constructor(private readonly proxyRepository: ProxyRepository) { }
	checkProxy(proxy: Proxy): boolean {
		return this.proxyRepository.checkProxy(proxy)
	}

	createProxy(): Proxy {
		return this.proxyRepository.createProxy()
	}
}