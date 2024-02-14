import { Injectable } from '@nestjs/common';
import { Payment, Wallet } from 'xrpl';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { client } from 'src/main';

type PaymentProps = Omit<Payment, "TransactionType" | "Account">

@Injectable()
export class PaymentsService {
  create = async({Amount, ...rest}: PaymentProps, seed: string) => {
    await client.connect()

    const wallet = Wallet.fromSeed(seed)
    
    const payment: Payment = {
      ...rest,
      Amount: String(((Amount as unknown as number) * 10 ** 6)),
      TransactionType: "Payment",
      Account: wallet.address
    }
    
    const response = await client.submitAndWait(payment, {
      autofill: true,
      wallet: wallet
    })
   
    await client.disconnect()

    return response
  }


  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
