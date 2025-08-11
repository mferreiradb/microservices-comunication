import Queue from './Queue';
import amqp from 'amqplib';

export default class RabbitMQAdapter implements Queue {
  async consume(queueName: string, callback: (input: any) => any): Promise<void> {
    const chanel = await this.connection!.createChannel();
    await chanel.assertQueue(queueName, { durable: true });
    chanel.consume(queueName, async (msg: any) => {
      const input = JSON.parse(msg.content.toString()); 
      await callback(input);
      chanel.ack(msg); // remove message from queue
    });
  }
  connection: any;

  async connect(): Promise<void> {
    this.connection = await amqp.connect('amqp://localhost');
  }

  async publish(queueName: string, data: any): Promise<void> {
    const chanel = await this.connection!.createChannel();
    await chanel.assertQueue(queueName, { durable: true });
    await chanel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      persistent: true
    });
  }
}