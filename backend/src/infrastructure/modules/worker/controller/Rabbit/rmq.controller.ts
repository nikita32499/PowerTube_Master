import { Controller } from '@nestjs/common'
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { RmqService } from 'infrastructure/common/modules/rmq/rmq.service'
import { WorkerNodeData } from 'powertube-shared'
import { NestWorkerAdapter } from '../../NestWorkerAdapter'

@Controller()
export class WorkerRabbitController {
	constructor(
		private readonly rmqService: RmqService,
		private readonly workerService: NestWorkerAdapter
	) { }

	@EventPattern('/worker/connect')
	async handleConnect(
		@Payload() data: WorkerNodeData,
		@Ctx() context: RmqContext
	): Promise<boolean> {
		try {
			await this.workerService.createWorkerNode(data)



			// Acknowledge the message
			this.rmqService.ack(context)

			return true
		} catch (error) {
			console.error('Error handling connect:', error)
			// Acknowledge the message even in case of error to prevent infinite retries
			this.rmqService.ack(context)
			return false
		}
	}

	@MessagePattern('/worker/disconnect')
	async handleDisconnect(
		@Payload() data: { host: string },
		@Ctx() context: RmqContext
	): Promise<boolean> {
		try {
			await this.workerService.getWorkerNodeByHost(data.host)



			// Acknowledge the message
			this.rmqService.ack(context)

			return true
		} catch (error) {
			console.error('Error handling disconnect:', error)
			// Acknowledge the message even in case of error to prevent infinite retries
			this.rmqService.ack(context)
			return false
		}
	}
}
