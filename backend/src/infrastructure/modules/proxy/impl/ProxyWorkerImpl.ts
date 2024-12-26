import { ProxyWorkerData } from 'core/entities/proxy/proxy.entity'
import { ProxyWorkerRepository } from 'core/entities/proxy/proxy.repository'
import { RmqService } from 'infrastructure/modules/rmq/rmq.service'




export class ProxyWorkerImpl implements ProxyWorkerRepository {
	constructor(private readonly rmqService: RmqService) { }


	async createProxy(ip: string): Promise<ProxyWorkerData> {
		return this.rmqService.sendMessage(ip, { event: 'createProxy' })
	}

	async getAllProxy(ip: string): Promise<ProxyWorkerData[]> {
		return this.rmqService.sendMessage(ip, { event: 'getAllProxy' })
	}

	async deleteProxy(ip: string, login: string): Promise<boolean> {
		return this.rmqService.sendMessage(ip, { event: 'deleteProxy', data: { login } })
	}
}
