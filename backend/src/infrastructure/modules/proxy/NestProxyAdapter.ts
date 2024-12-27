import { Inject, Injectable } from '@nestjs/common'
import { Proxy, ProxyWorkerData } from 'core/entities/proxy/proxy.entity'
import { ProxyCheckRepository, ProxyDatabaseRepository, ProxySocketWorkerRepository } from 'core/entities/proxy/proxy.repository'
import { EnumProxyStatus } from 'core/entities/proxy/types/proxy.types'
import { User } from 'core/entities/user/user.entity'
import { DI_TOKENS } from 'infrastructure/libs/constants'
import { NestUserAdapter } from '../user/NestUserAdapter'
import { NestWorkerAdapter } from '../worker/NestWorkerAdapter'



@Injectable()
export class NestProxyAdapter {
	constructor(@Inject(DI_TOKENS.PROXY.DATABASE) private readonly proxyDatabase: ProxyDatabaseRepository,
		@Inject(DI_TOKENS.PROXY.SOCKET_WORKER) private readonly proxySocketWorker: ProxySocketWorkerRepository,
		@Inject(DI_TOKENS.PROXY.CHECK) private readonly proxyCheck: ProxyCheckRepository,
		private readonly userService: NestUserAdapter,
		private readonly workerNodeService: NestWorkerAdapter) {

	}



	async checkAvailableProxy(proxy: ProxyWorkerData): Promise<boolean> {
		const proxyDiagnosticData = await this.proxyCheck.getConnectDataProxy(proxy)

		const proxyAvail = proxyDiagnosticData.status === EnumProxyStatus.CONNECTED

		return proxyAvail
	}

	async getProxyForUser(userId: User['id']): Promise<Proxy> {
		const user = await this.userService.getById(userId)

		let proxy = user.proxy

		if (!proxy) {
			const workerNode = await this.workerNodeService.getBestWorkerNode()
			const newProxyData = await this.proxySocketWorker.createProxy(workerNode.host)

			const proxyAvail = await this.checkAvailableProxy(newProxyData)

			if (proxyAvail) {
				proxy = await this.proxyDatabase.saveProxy(newProxyData)
			} else {
				//TODO: тут нужно понизить рейтинг воркер ноды
				throw new Error('Proxy not available')
			}


		}

		return proxy


	}



	async resetProxyForUser(userId: User['id']): Promise<Proxy> {
		const user = await this.userService.getById(userId)

		const proxy = user.proxy

		if (proxy) {
			if (!await this.proxySocketWorker.deleteProxy(proxy.host, proxy.login)) {
				throw new Error('Failed to delete proxy')
			}
			await this.proxyDatabase.deleteProxyById(proxy.id)
		}

		return await this.getProxyForUser(userId)
	}
}