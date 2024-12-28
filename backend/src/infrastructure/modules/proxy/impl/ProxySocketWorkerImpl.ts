import { Injectable } from '@nestjs/common'
import { ProxyWorkerData } from 'core/entities/proxy/proxy.entity'
import { ProxySocketWorkerRepository } from 'core/entities/proxy/proxy.repository'
import { SchemaProxyWorkerData } from 'core/entities/proxy/schema/proxy.schema'
import { RmqService } from 'infrastructure/common/modules/rmq/rmq.service'
import { z } from 'zod'

@Injectable()
export class ProxySocketWorkerImpl implements ProxySocketWorkerRepository {
	constructor(private readonly rmqService: RmqService) { }

	async createProxy(host: string): Promise<ProxyWorkerData> {
		const result = await this.rmqService.sendMessageAndReply({
			queueName: host,
			pattern: 'createProxy',
			replyQueueName: 'master',
			data: {},
			schema: SchemaProxyWorkerData,
		})
		return result
	}

	async getAllProxy(host: string): Promise<ProxyWorkerData[]> {
		const result = await this.rmqService.sendMessageAndReply({
			queueName: host,
			pattern: 'getAllProxy',
			replyQueueName: 'master',
			data: {},
			schema: SchemaProxyWorkerData.array(),
		})
		return result
	}

	async deleteProxy(host: string, login: string): Promise<boolean> {
		return this.rmqService.sendMessageAndReply({
			queueName: host,
			pattern: 'deleteProxy',
			replyQueueName: 'master',
			data: { login },
			schema: z.boolean(),
		})
	}
}
