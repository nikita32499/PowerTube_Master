import { Controller, Get, NotFoundException } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UserMapper } from 'core/entities/user/mapper/user.mapper'
import { EnumUserRole } from 'core/entities/user/types/user.types'
import { GetUserId, SetPermissions } from 'infrastructure/common/decorators/controller'
import { NestUserAdapter } from 'infrastructure/modules/user/NestUserAdapter'
import { DtoUser, DtoUserClient } from '../../../../../core/entities/user/dto/user.dto'

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: NestUserAdapter) { }

    @ApiOkResponse({
        description: 'Get all users',
        type: DtoUser,
    })
    @SetPermissions(EnumUserRole.ADMIN)
    @Get('getAll')
    async getUser(): Promise<DtoUser[]> {
        return this.userService.getAll()
    }

    @ApiOkResponse({
        description: 'Get user by id',
        type: DtoUserClient,
    })
    @SetPermissions(EnumUserRole.USER)
    @Get('getById')
    async getUserById(@GetUserId() userId: string): Promise<DtoUserClient> {
        const user = await this.userService.getById(userId)
        if (!user) throw new NotFoundException('User not found')
        return UserMapper.toClientFormat(user)
    }
}
