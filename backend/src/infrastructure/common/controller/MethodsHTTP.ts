import { applyDecorators, Post } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { EnumUserRole } from 'core/entities/user/types/user.types'
import { SetPermissions } from '../decorators/controller'

interface PostEndpointOptions {
	description: string
	type: any
	permission: EnumUserRole | 'public'
	path: string
}

export function PostEndpoint(options: PostEndpointOptions) {
	return applyDecorators(
		Post(options.path),
		ApiOkResponse({
			description: options.description,
			type: options.type,
			status: 201
		}),

		SetPermissions(options.permission)
	)
}