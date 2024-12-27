import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProxyWorkerData } from 'core/entities/proxy/proxy.entity'
import { ProxyDatabaseRepository } from 'core/entities/proxy/proxy.repository'
import { TypeormLib } from 'infrastructure/libs/typeorm/typeorm.libs'
import { Repository } from 'typeorm'
import { ProxyDB } from '../db/proxy.typeorm'



@Injectable()
export class ProxyDatabaseImpl implements ProxyDatabaseRepository {
	constructor(@InjectRepository(ProxyDB) private readonly proxyDB: Repository<ProxyDB>) {

	}
	async saveProxy(proxy: ProxyWorkerData) {
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

	async updateProxy(id: string, proxy: Partial<ProxyWorkerData>) {
		const result = await this.proxyDB.update(id, proxy)
		return TypeormLib.isAffectedSuccess(result)
	}
}
