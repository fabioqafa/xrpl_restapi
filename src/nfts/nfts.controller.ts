import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { MintNftDto } from './dto/mint-nft.dto';
import { CreateOfferNftDto } from './dto/create-offer-nft-dto';
import { AcceptSellOfferNftDto } from './dto/accept-sell-offer-nft-dto';
import { AcceptBuyOfferNftDto } from './dto/accept-buy-offer-nft-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('nfts')
@Controller('nfts')
export class NftsController {
  constructor(private readonly nftsService: NftsService) {}

  @Post('mint')
  mint(@Body() {URI, NFTokenTaxon, seed}: MintNftDto) {
    return this.nftsService.mint({URI, NFTokenTaxon}, seed);
  }

  @Post('offer/create')
  createOffer(@Body() {NFTokenID, Amount, Owner, sellOffer, seed}: CreateOfferNftDto) {
    return this.nftsService.createOffer({NFTokenID, Amount, Owner}, sellOffer, seed)
  }

  @Post('sell-offer/accept')
  acceptSellOffer(@Body() {NFTokenSellOffer, seed}: AcceptSellOfferNftDto) {
    return this.nftsService.acceptOffer({ NFTokenSellOffer }, seed)
  }

  @Post('buy-offer/accept')
  acceptBuyOffer(@Body() {NFTokenBuyOffer, seed}: AcceptBuyOfferNftDto) {
    return this.nftsService.acceptOffer({ NFTokenBuyOffer }, seed)
  }

  @Get('sell-offers:nft_id')
  findSellOffers(@Param('nft_id') nft_id: string) {
    return this.nftsService.findSellOffers(nft_id);
  }

  @Get('buy-offers:nft_id')
  findBuyOffers(@Param('nft_id') nft_id: string) {
    return this.nftsService.findBuyOffers(nft_id);
  }

}
