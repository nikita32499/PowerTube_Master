import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProxyDatabaseRepository } from 'core/repository/proxy.repository'
import { TypeormLib } from 'infrastructure/common/helpers/typeorm/typeorm.libs'
import { ProxyCredentials } from 'powertube-shared'
import { Repository } from 'typeorm'
import { ProxyDB } from '../db/proxy.typeorm'



@Injectable()
export class ProxyDatabaseImpl implements ProxyDatabaseRepository {
	constructor(@InjectRepository(ProxyDB) private readonly proxyDB: Repository<ProxyDB>) {

	}
	async saveProxy(proxy: ProxyCredentials) {
		return this.proxyDB.save(proxy)
	}
	async deleteProxyById(id: string) {
		const result = await this.proxyDB.delete(id)
		return TypeormLib.isAffectedSuccess(result)
	}
	async getProxyById(id: string) {
		const proxy = await this.proxyDB.findOne({ where: { id } })
		if (!proxy) {
			throw new Error('Proxy not found')
		}
		return proxy
	}

	async updateProxy(id: string, proxy: Partial<ProxyCredentials>) {
		const result = await this.proxyDB.update(id, proxy)
		return TypeormLib.isAffectedSuccess(result)
	}
}
