import { Proxy } from 'core/entities/proxy/proxy.entity'
import { ProxyRepository } from 'core/entities/proxy/proxy.repository'




export class ProxyRepoImpl implements ProxyRepository {
	constructor() { }

	createProxy(): Proxy {
		throw new Error('Method not implemented.')
	}

	checkProxy(): boolean {
		throw new Error('Method not implemented.')
	}
}
