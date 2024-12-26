import { SchemaUser, SchemaUserClient } from 'core/entities/user/schema/user.schema'
import { createZodDto } from 'nestjs-zod'

export class DtoUser extends createZodDto(SchemaUser) { }
export class DtoUserClient extends createZodDto(SchemaUserClient) { }
