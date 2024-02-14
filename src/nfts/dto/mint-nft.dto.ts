import { ApiProperty } from "@nestjs/swagger"

export class MintNftDto {
    @ApiProperty()
    URI: string

    @ApiProperty()
    NFTokenTaxon?: number
    
    @ApiProperty()
    seed: string
}
