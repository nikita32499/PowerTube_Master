import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PostEndpoint } from 'infrastructure/common/decorators/MethodsHTTP'
import { GetUserId } from 'infrastructure/common/decorators/controller'
import { EnumUserRole } from 'powertube-shared'

import { DtoProxy } from 'powertube-shared'
import { NestProxyAdapter } from '../../NestProxyAdapter'



@ApiTags('Proxy')
@Controller('proxy')
export class ProxyRestController {
	constructor(private readonly proxyService: NestProxyAdapter) { }

	@PostEndpoint({
		description: 'Get proxy for user',
		type: DtoProxy,
		path: 'getProxyForUser',
		permission: EnumUserRole.USER
	})
	async getProxyForUser(@GetUserId() userId: string): Promise<DtoProxy> {
		return this.proxyService.getProxyForUser(userId)
	}


	@PostEndpoint({
		description: 'Reset proxy for user',
		type: DtoProxy,
		path: 'resetProxyForUser',
		permission: EnumUserRole.USER
	})
	async resetProxyForUser(@GetUserId() userId: string): Promise<DtoProxy> {
		return this.proxyService.resetProxyForUser(userId)
	}
}
