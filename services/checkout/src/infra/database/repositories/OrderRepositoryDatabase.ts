import IOrderRepository from '../../../application/repositories/OrderRepository';
import Order from '../../../domain/Order';
import pgp from 'pg-promise';

export default class OrderRepositoryDatabase implements IOrderRepository {
  async save(order: Order): Promise<void> {
    const connection = pgp()('postgres://user:password@localhost:5432/mferreira');
    await connection.query('insert into orders (order_id, course_id, name, email, amount, status) values ($1, $2, $3, $4, $5, $6)', [
      order.orderId,
      order.courseId,
      order.name,
      order.email,
      order.amount,
      order.status
    ]);
    
    await connection.$pool.end();
  }

  async udpate(order: Order): Promise<void> {
    const connection = pgp()('postgres://user:password@localhost:5432/mferreira');
    await connection.query('udpate orders set status = $1 where order_id = $2', [
      order.status,
      order.orderId
    ]);
    
    await connection.$pool.end();
  }

  async getById(id: string): Promise<Order> {
    const connection = pgp()('postgres://user:password@localhost:5432/mferreira');
    const [order] = await connection.query('select * from orders where order_id = $1', [
      id
    ]);
    
    await connection.$pool.end();

    return new Order(order.order_id, order.course_id, order.name, order.email, parseFloat(order.amount), order.status);
  }
  

}