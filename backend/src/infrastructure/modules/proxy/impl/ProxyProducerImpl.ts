import { Injectable } from '@nestjs/common'
import { ProxyProducerRepository } from 'core/repository/proxy.repository'
import { RmqService } from 'infrastructure/common/modules/rmq/rmq.service'
import { ProxyCredentials, SchemaProxyCredentials } from 'powertube-shared'
import { z } from 'zod'

@Injectable()
export class ProxyProducerImpl implements ProxyProducerRepository {
	constructor(private readonly rmqService: RmqService) { }

	async createProxy(host: string): Promise<ProxyCredentials> {
		const result = await this.rmqService.sendMessageAndReply({
			queueName: host,
			pattern: 'createProxy',
			replyQueueName: 'master',
			data: {},
			schema: SchemaProxyCredentials,
		})
		return result
	}

	async getAllProxy(host: string): Promise<ProxyCredentials[]> {
		const result = await this.rmqService.sendMessageAndReply({
			queueName: host,
			pattern: 'getAllProxy',
			replyQueueName: 'master',
			data: {},
			schema: z.array(SchemaProxyCredentials),
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
