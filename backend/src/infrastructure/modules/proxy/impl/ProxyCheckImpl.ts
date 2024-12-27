import { ProxyWorkerData, TProxyDiagnosticData } from 'core/entities/proxy/proxy.entity'
import { ProxyCheckRepository } from 'core/entities/proxy/proxy.repository'
import { EnumProxyStatus } from 'core/entities/proxy/types/proxy.types'

import { Injectable } from '@nestjs/common'
import axios, { AxiosResponse } from 'axios'
import { SchemaGetConnectDataProxyResponse } from 'core/entities/proxy/schema/proxy.schema'
import { HttpsProxyAgent } from 'https-proxy-agent'


@Injectable()
export class ProxyCheckImpl implements ProxyCheckRepository {
	constructor() {

	}

	async getConnectDataProxy(proxy: ProxyWorkerData): Promise<TProxyDiagnosticData> {
		const startTime = Date.now()
		let response: AxiosResponse<unknown> | undefined = undefined
		let errorMessage: string | null = null


		try {
			const httpsAgent = new HttpsProxyAgent({
				host: proxy.host,
				port: proxy.port,
				auth: `${proxy.login}:${proxy.password}`
			})

			response = await axios.get('https://api.ipify.org?format=json', {
				httpsAgent,
				timeout: 10000,
				validateStatus: () => true
			})



		} catch (error) {
			if (axios.isAxiosError(error)) {
				errorMessage = error.message
				response = error.response
			} else {
				throw error
			}
		}

		const endTime = Date.now()

		if (!response || response.status !== 200) {
			return {
				proxy,
				status: EnumProxyStatus.ERROR,
				delay: endTime - startTime,
				statusCode: response?.status || 0,
				ip: null,
				error: errorMessage || 'Unknown error'
			}
		}

		const data = SchemaGetConnectDataProxyResponse.parse(response.data)

		return {
			proxy,
			status: EnumProxyStatus.CONNECTED,
			delay: endTime - startTime,
			statusCode: response.status,
			ip: data.ip
		}
	}
}
