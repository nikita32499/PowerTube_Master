import {
    createParamDecorator,
    ExecutionContext,
    SetMetadata,
    UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { EnumUserRole } from 'powertube-shared'

export const SetPermissions = (...roles: (EnumUserRole | 'public')[]) =>
    SetMetadata('roles', roles)

export const GetUserId = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): string => {
        const request: Request = ctx.switchToHttp().getRequest()
        const userId = request.userJwtData?.userId

        if (!userId) throw new UnauthorizedException('User not found')

        return userId
    },
)
