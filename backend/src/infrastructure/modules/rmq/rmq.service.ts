import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices'
import * as amqp from 'amqplib'
import { Config } from 'infrastructure/libs/config'

@Injectable()
export class RmqService implements OnModuleDestroy, OnModuleInit {
	private connection!: amqp.Connection
	private channel!: amqp.Channel

	onModuleInit() {
		this.initialize()
	}

	constructor() {

	}


	getOptions(queueName: string, noAck = false): RmqOptions {
		return {
			transport: Transport.RMQ,
			options: {
				urls: [Config.RABBIT_MQ_URI],
				queue: queueName,
				noAck,
				persistent: true,
			},
		}
	}

	ack(context: RmqContext) {
		const channel = context.getChannelRef()
		const originalMessage = context.getMessage()
		channel.ack(originalMessage)
	}

	private async initialize() {
		this.connection = await amqp.connect(Config.RABBIT_MQ_URI)
		this.channel = await this.connection.createChannel()
	}

	async sendMessage(queueName: string, data: SerializableObject, routingKey?: string) {
		await this.channel.assertQueue(queueName, {
			durable: true,
		})

		this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
			persistent: true,
			headers: routingKey ? {
				'routing-key': routingKey,
			} : undefined,
		})

		console.log(`Message sent to queue ${queueName} with routing key ${routingKey}`)
	}

	async onModuleDestroy() {
		await this.channel.close()
		await this.connection.close()
	}
}