import Checkout from '../src/application/usecases/Checkout';
import GetOrder from '../src/application/usecases/GetOrder';
import CourseRepositoryDatabase from '../src/infra/database/repositories/CourseRepositoryDatabase';
import OrderRepositoryDatabase from '../src/infra/database/repositories/OrderRepositoryDatabase';
import PaymentGatewayHttp from '../src/infra/gateway/PaymentGatewayHttp';
import RabbitMQAdapter from '../src/infra/queue/RabbitMQAdapter';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}

test('should make a checkout', async () => {
  const orderRepository = new OrderRepositoryDatabase();
  const courseRepository = new CourseRepositoryDatabase();
  const paymentGateway = new PaymentGatewayHttp();
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const checkout = new Checkout(
    orderRepository,
    courseRepository,
    paymentGateway,
    queue
  );
  const input = {
    courseId  : 'db2775ec-5abd-4cc8-aed0-f6973547a91a',
    name      : 'test',
    email     : 'test@test.com',
    cardToken : '123456789'
  };
  const checkoutOutput = await checkout.execute(input);
  
  await sleep(200);
  const getOrder = new GetOrder(orderRepository);
  const getOrderOutput = await getOrder.execute(checkoutOutput.orderId);
  expect(checkoutOutput.orderId).toBeDefined();
  expect(getOrderOutput.orderId).toBeDefined();
  expect(getOrderOutput.orderId).toEqual(checkoutOutput.orderId);
  expect(getOrderOutput.name).toBe(input.name);
  expect(getOrderOutput.email).toBe(input.email);
  expect(getOrderOutput.amount).toBe(1000);
  expect(getOrderOutput.status).toBe('confirmed');
}); 