import { Injectable } from '@nestjs/common';
import { client } from 'src/main';
import { NFTokenMintFlags, NFTokenMint, Wallet, convertStringToHex, NFTokenCreateOffer, NFTokenCreateOfferFlags, NFTokenAcceptOffer, NFTSellOffersRequest, OfferCreate, NFTBuyOffersRequest} from 'xrpl';

type MintNftProps = Omit<NFTokenMint, 'TransactionType' | 'Account'>
type CreateNftOffer = Omit<NFTokenCreateOffer, 'TransactionType' | 'Account'>
type AcceptNftOffer = Omit<NFTokenAcceptOffer, 'TransactionType' | 'Account'>
type BuyNftOffer = Omit<OfferCreate, 'TransactionType' | 'Account'>

@Injectable()
export class NftsService {
  mint = async({URI, NFTokenTaxon = 0}: MintNftProps, seed: string) => {
    await client.connect()

    const wallet = Wallet.fromSeed(seed)

    const mintTxn: NFTokenMint = {
      URI: convertStringToHex(URI ?? ""),
      Flags: NFTokenMintFlags.tfTransferable,
      NFTokenTaxon,
      TransactionType: "NFTokenMint",
      Account: wallet.address,
    }

    const response = await client.submitAndWait(mintTxn, {
      autofill: true,
      wallet
    })

    await client.disconnect()

    return response
  }

  createOffer = async({Amount, Owner, ...rest}: CreateNftOffer, sellOffer: boolean, seed: string) => {
    await client.connect()

    const wallet = Wallet.fromSeed(seed)

    const createOfferTxn: NFTokenCreateOffer = {
      ...rest,
      Amount: String(((Amount as unknown as number) * 10 ** 6)),
      TransactionType: "NFTokenCreateOffer",
      Account: wallet.address,
      ...(sellOffer && { Flags: NFTokenCreateOfferFlags.tfSellNFToken }),
      ...(!sellOffer && { Owner })
    };
    

    const response = await client.submitAndWait(createOfferTxn, {
      autofill: true,
      wallet
    })

    await client.disconnect()

    return response

  }

  acceptOffer = async({NFTokenSellOffer, NFTokenBuyOffer}: AcceptNftOffer, seed: string) => {
    await client.connect()

    const wallet = Wallet.fromSeed(seed)

    const acceptOffer: NFTokenAcceptOffer = {
      ...(NFTokenSellOffer && { NFTokenSellOffer}),
      ...(NFTokenBuyOffer && {NFTokenBuyOffer}),
      TransactionType: "NFTokenAcceptOffer",
      Account: wallet.address
    }

    const response = await client.submitAndWait(acceptOffer, {
      autofill: true,
      wallet
    })

    await client.disconnect()

    return response
  }

  findSellOffers = async(nft_id: string) => {
    await client.connect()

    const sellOfferRequest: NFTSellOffersRequest = {
      command: 'nft_sell_offers',
      nft_id
    }

    const response = await client.request(sellOfferRequest)

    return response;
  }

  findBuyOffers = async(nft_id: string) => {
    await client.connect()

    const sellOfferRequest: NFTBuyOffersRequest = {
      command: 'nft_buy_offers',
      nft_id
    }

    const response = await client.request(sellOfferRequest)

    return response;
  }

}
