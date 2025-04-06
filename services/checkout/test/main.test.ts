import Checkout from '../src/application/usecases/Checkout';
import CourseRepositoryDatabase from '../src/infra/database/repositories/CourseRepositoryDatabase';
import OrderRepositoryDatabase from '../src/infra/database/repositories/OrderRepositoryDatabase';



test('should make a checkout', async () => {
  const orderRepository = new OrderRepositoryDatabase();
  const courseRepository = new CourseRepositoryDatabase();
  const checkout = new Checkout(orderRepository, courseRepository);
  const input = {
    courseId  : 'db2775ec-5abd-4cc8-aed0-f6973547a91a',
    name      : 'test',
    email     : 'test@test.com',
    cardToken : '123456789'
  };
  const output = await checkout.execute(input);

  expect(output.orderId).toBeDefined();
}); 