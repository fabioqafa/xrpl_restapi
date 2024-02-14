import { ApiProperty } from "@nestjs/swagger"

export class CreatePaymentDto {
    @ApiProperty()
    destination: string
    
    @ApiProperty()
    amount: string

    @ApiProperty()
    seed: string
}
