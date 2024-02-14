import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftsModule } from './nfts/nfts.module';
import { PaymentsModule } from './payments/payments.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [NftsModule, PaymentsModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
