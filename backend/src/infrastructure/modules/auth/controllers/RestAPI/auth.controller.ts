import { Body, Controller, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DtoUserClient } from 'core/entities/user/dto/user.dto'
import { UserMapper } from 'core/entities/user/mapper/user.mapper'
import { User } from 'core/entities/user/user.entity'
import { Response } from 'express'
import { BaseController } from 'infrastructure/common/controller/BaseController'
import { PostEndpoint } from 'infrastructure/common/controller/MethodsHTTP'
import { NestAuthAdapter } from 'infrastructure/modules/auth/NestAuthAdapter'
import { DtoAuthLogin, DtoAuthRegisterWithPassword } from '../../../../../core/entities/auth/dto/auth.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController extends BaseController {
    constructor(private readonly authService: NestAuthAdapter) {
        super()
    }

    @PostEndpoint({
        description: 'Login a user',
        type: DtoUserClient,
        path: 'login',
        permission: 'public'
    })
    async login(@Body() data: DtoAuthLogin, @Res({ passthrough: true }) response: Response): Promise<DtoUserClient> {
        const user = await this.authService.login(data)

        await this.setAccessToken(user, response)

        return UserMapper.toClientFormat(user)
    }


    @PostEndpoint({
        description: 'Register a new user with password',
        type: DtoUserClient,
        path: 'register-with-Password',
        permission: 'public'
    })
    async registerWithPassword(
        @Body() data: DtoAuthRegisterWithPassword,
        @Res({ passthrough: true }) response: Response,
    ): Promise<DtoUserClient> {
        const user = await this.authService.registerWithPassword(data)

        await this.setAccessToken(user, response)

        return UserMapper.toClientFormat(user)
    }


    @PostEndpoint({
        description: 'Register a new user',
        type: DtoUserClient,
        path: 'register',
        permission: 'public'
    })
    async register(@Res({ passthrough: true }) response: Response): Promise<DtoUserClient> {
        const user = await this.authService.register()

        await this.setAccessToken(user, response)

        return UserMapper.toClientFormat(user)


    }

    private async setAccessToken(user: User, response: Response) {
        const token = await this.authService.createUserToken({
            userId: user.id,
            version: user.jwtVersion,
        })

        await this.setCookie('access_token', token, response)
    }


}
