import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { EnumUserRole } from 'core/entities/user/types/user.types'
import { GetUserId, SetPermissions } from 'infrastructure/libs/decorators/controller'
import { DtoProxy } from '../../dto/proxy.dto'
import { NestProxyAdapter } from '../../NestProxyAdapter'



@ApiTags('Proxy')
@Controller('proxy')
export class ProxyRestController {
	constructor(private readonly proxyService: NestProxyAdapter) { }

	@ApiOkResponse({
		description: 'Get proxy for user',
		type: DtoProxy,
	})
	@SetPermissions(EnumUserRole.USER)
	@Get('getProxyForUser')
	async getProxyForUser(@GetUserId() userId: string) {
		return this.proxyService.getProxyForUser(userId)
	}
}