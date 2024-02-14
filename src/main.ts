import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Client } from 'xrpl';

export let client: Client

const networks = {
  RIPPLE_TESTNET: "wss://s.altnet.rippletest.net:51233/"
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('XRPL Basic API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if(!client) {
    client = new Client(networks.RIPPLE_TESTNET)
  }
  
  await app.listen(3000);
}
bootstrap();
