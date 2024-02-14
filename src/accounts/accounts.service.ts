import { Injectable } from '@nestjs/common';
import { client } from 'src/main';

@Injectable()
export class AccountsService {

  findOne = async(account_address: string) => {
    await client.connect()

    const response = await client.request({
      command: 'account_info',
      account: account_address
    })

    await client.disconnect()

    return response
  }
}
