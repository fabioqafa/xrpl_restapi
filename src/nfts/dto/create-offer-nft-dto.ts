import { ApiProperty } from "@nestjs/swagger"

export class CreateOfferNftDto {
    @ApiProperty()
    NFTokenID: string

    @ApiProperty()
    Amount: string

    @ApiProperty()
    sellOffer: boolean

    @ApiProperty()
    Owner: string

    @ApiProperty()
    seed: string
}