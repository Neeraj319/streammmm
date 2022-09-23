import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmqpModule } from 'nestjs-amqp';
import { RabbitMqService } from './rabbitmq.service';
@Module({
  imports: [
    AmqpModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        hostname: configService.get('rabbitMq.hostname'),
        username: configService.get('rabbitMq.username'),
        password: configService.get('rabbitMq.password'),
        port: configService.get('rabbitMq.port'),
      }),
    }),
  ],
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitmqModule {}
