import { ApiProperty } from "@nestjs/swagger"

export class AcceptSellOfferNftDto {
    @ApiProperty()
    NFTokenSellOffer: string

    @ApiProperty()
    seed: string
}