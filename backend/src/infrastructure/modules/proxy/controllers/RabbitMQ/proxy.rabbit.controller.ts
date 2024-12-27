import { Controller } from '@nestjs/common'
import { RmqService } from 'infrastructure/modules/rmq/rmq.service'

@Controller()
export class ProxyRabbitController {
	constructor(private readonly rmqService: RmqService) {




		// let index = 0
		// setInterval(() => {

		// 	index = (index + 1) % 2

		// 	const queueName = ['1_1_1_1', "22_22_22_22"][index] as string


		// 	this.sendMessageToProxyQueue(queueName)



		// }, 1000)


	}







	async sendMessageToProxyQueue(queueName: string) {
		console.log('sendMessageToProxyQueue', queueName)

		// const routingKey = '221_23_65_83' // Replace dots with underscores
		const message = { key: 'value', date: new Date().toISOString() } // Your JSON message

		await this.rmqService.sendMessage(queueName, message, queueName)
	}


}
