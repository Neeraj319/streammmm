import { Injectable } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp';
import { Connection } from 'amqplib';

@Injectable()
export class RabbitMqService {
  constructor(@InjectAmqpConnection() private readonly amqp: Connection) {}
  async addImagetoQueue(imageName: string) {
    const channel = await this.amqp.createChannel();
    await channel.assertQueue('image');
    let message = {
      id: (Math.random() + 1).toString(36).substring(7),
      task: 'resize_image',
      args: [imageName],
      eta: new Date().toISOString(),
    };
    channel.sendToQueue('image', Buffer.from(JSON.stringify(message)), {
      contentType: 'application/json',
      persistent: true,
      contentEncoding: 'utf-8',
    });
  }
}
