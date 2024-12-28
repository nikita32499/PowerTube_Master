

import { SchemaProxy } from 'core/entities/proxy/schema/proxy.schema'
import { createZodDto } from 'nestjs-zod'

export class DtoProxy extends createZodDto(SchemaProxy) { }