import {
    createParamDecorator,
    ExecutionContext,
    SetMetadata,
    UnauthorizedException,
} from '@nestjs/common'
import { EnumUserRole } from 'core/entities/user/types/user.entities'
import { Request } from 'express'

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
