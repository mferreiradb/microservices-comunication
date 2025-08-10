import IOrderRepository from '../repositories/OrderRepository';

export default class GetOrder {
  constructor(
    readonly orderRepository: IOrderRepository
  ) {}

  async execute(orderId: string): Promise<Output> {
    const order = await this.orderRepository.getById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    return {
      orderId : order.orderId,
      name    : order.name,
      email   : order.email,
      amount  : order.amount,
      status  : order.status
    };
  }
}

type Output = {
    orderId: string
    name: string
    email: string
    amount: number
    status: string
}