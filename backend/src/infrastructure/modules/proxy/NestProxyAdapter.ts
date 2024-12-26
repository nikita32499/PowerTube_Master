import { Inject, Injectable } from '@nestjs/common'
import { ProxyRepository } from 'core/entities/proxy/proxy.repository'
import { ProxyService } from 'core/services/ProxyService'
import { DI_TOKENS } from 'infrastructure/libs/constants'



@Injectable()
export class NestProxyAdapter extends ProxyService {
	constructor(@Inject(DI_TOKENS.PROXY_REPOSITORY) proxyRepository: ProxyRepository) {
		super(proxyRepository)
	}
}
