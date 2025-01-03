import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    ValidationPipe,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { GetUserId, SetPermissions } from 'infrastructure/common/decorators/controller'
import { DtoPaymentData, EnumUserRole, Payment, PaymentClient, PaymentMapper } from 'powertube-shared'

import { DtoPaymentArray, DtoPaymentClient } from 'powertube-shared'
import { NestPaymentAdapter } from '../../NestPaymentAdapter'

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: NestPaymentAdapter) { }

    @ApiOkResponse({
        description: 'Get all payments',
        type: DtoPaymentArray,
    })
    @SetPermissions(EnumUserRole.ADMIN)
    @Get('getAll')
    getAll(): Promise<Payment[]> {
        return this.paymentService.getAll()
    }

    @ApiCreatedResponse({
        description: 'Start payment',
        type: DtoPaymentClient,
    })
    @SetPermissions(EnumUserRole.USER)
    @Post('startPayment')
    async startPayment(@Body() data: DtoPaymentData) {
        const payment = await this.paymentService.startPayment(data)

        return PaymentMapper.toClientFormat(payment)
    }

    @ApiOkResponse({
        description: 'Cancel payment',
        type: Boolean,
    })
    @SetPermissions(EnumUserRole.USER)
    @Post('cancelPayment')
    cancelPayment(
        @GetUserId() userId: string,
        @Param('paymentId', new ValidationPipe()) paymentId: string,
    ) {
        const hasPermission = this.paymentService.hasPermission(userId, paymentId)

        if (!hasPermission) {
            throw new NotFoundException('Payment not found')
        }

        return this.paymentService.cancelPayment(paymentId)
    }

    @ApiOkResponse({
        description: 'Get payment by id',
        type: DtoPaymentClient,
    })
    @SetPermissions(EnumUserRole.USER)
    @Post('getById')
    async getById(
        @Req() req: Request,
        @Param('paymentId', new ValidationPipe()) paymentId: string,
    ): Promise<PaymentClient> {
        const userId = String(req.userJwtData?.userId)

        const hasPermission = this.paymentService.hasPermission(userId, paymentId)

        if (!hasPermission) {
            throw new NotFoundException('Payment not found')
        }

        const payment = await this.paymentService.getByPaymentId(paymentId)

        if (!payment) {
            throw new NotFoundException('Payment not found')
        }

        return PaymentMapper.toClientFormat(payment)
    }
}
