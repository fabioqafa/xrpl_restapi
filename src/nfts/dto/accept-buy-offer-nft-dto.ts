import { ApiProperty } from "@nestjs/swagger"

export class AcceptBuyOfferNftDto {
    @ApiProperty()
    NFTokenBuyOffer: string

    @ApiProperty()
    seed: string
}