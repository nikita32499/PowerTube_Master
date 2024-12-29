import { applyDecorators, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { EnumUserRole } from 'powertube-shared'
import { SetPermissions } from './controller'

interface PostEndpointOptions {
	description: string
	type: any
	permission: EnumUserRole | 'public'
	path: string
}

export function PostEndpoint(options: PostEndpointOptions) {
	return applyDecorators(
		Post(options.path),
		ApiResponse({
			description: options.description,
			type: options.type,
			status: 201
		}),

		SetPermissions(options.permission)
	)
}