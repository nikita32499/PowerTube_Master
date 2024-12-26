import { Inject, Injectable } from '@nestjs/common'
import { ProxyDatabaseRepository } from 'core/entities/proxy/proxy.repository'
import { DI_TOKENS } from 'infrastructure/libs/constants'



@Injectable()
export class NestProxyAdapter {
	constructor(@Inject(DI_TOKENS.PROXY_REPOSITORY) proxyRepository: ProxyDatabaseRepository) {

	}
}
