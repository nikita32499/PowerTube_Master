// import { Proxy, ProxyWorkerData } from 'core/entities/proxy/proxy.entity'
// import { IProxyService, ProxyCheckRepository, ProxyDatabaseRepository, ProxyQueueRepository } from 'core/entities/proxy/proxy.repository'
// import { User } from 'core/entities/user/user.entity'
// import { UserService } from './UserService'
// import { WorkerNodeService } from './WorkerNodeService'





// export class ProxyService implements IProxyService {
// 	constructor(private readonly workerNodeService: WorkerNodeService, private readonly userService: UserService, private readonly proxyDatabaseRepo: ProxyDatabaseRepository, private readonly proxyCheckRepo: ProxyCheckRepository, private readonly proxyQueueService: ProxyQueueRepository,

// 	) { }
// 	async getProxyForUser(userId: User['id']): Promise<Proxy> {
// 		const user = await this.userService.getById(userId)

// 		let proxy = user.proxy

// 		if (!proxy) {
// 			const workerNode = await this.workerNodeService.getBestWorkerNode()
// 			const newProxyData = await this.proxyQueueService.createProxy(workerNode.ip)

// 			const proxyAvail = await this.checkAvailableProxy(newProxyData)

// 			if (proxyAvail) {
// 				proxy = await this.proxyDatabaseRepo.saveProxy(newProxyData)
// 			} else {
// 				//TODO: тут нужно понизить рейтинг воркер ноды
// 				throw new Error('Proxy not available')
// 			}


// 		}

// 		return proxy








// 	}

// async checkAvailableProxy(proxy: ProxyWorkerData): Promise<boolean> {
// 	const proxyAvail = await this.proxyCheckRepo.checkAvailableProxy(proxy)

// 	if (proxyAvail) {
// 		return true
// 	} else {
// 		return false
// 	}
// }





// }