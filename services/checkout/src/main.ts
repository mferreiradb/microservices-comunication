import ConfirmOrder from './application/usecases/ConfirmOrder';
import OrderRepositoryDatabase from './infra/database/repositories/OrderRepositoryDatabase';
import RabbitMQAdapter from './infra/queue/RabbitMQAdapter';


async function main() {
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const orderRepository = new OrderRepositoryDatabase();
  const confirmOrder = new ConfirmOrder(orderRepository);
  console.log('Checkout service is running and waiting for messages...');
  queue.consume('payment_aproved', async (input: any) => {
    console.log('Payment aproved event received:', {...input, processedAt: new Date().toISOString()});
    confirmOrder.execute(input);
  });
}

main();