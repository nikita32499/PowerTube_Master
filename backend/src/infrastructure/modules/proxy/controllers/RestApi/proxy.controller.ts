import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { EnumUserRole } from 'core/entities/user/types/user.types'
import { PostEndpoint } from 'infrastructure/common/controller/MethodsHTTP'
import { GetUserId } from 'infrastructure/common/decorators/controller'

import { DtoProxy } from 'core/entities/proxy/dto/proxy.dto'
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
