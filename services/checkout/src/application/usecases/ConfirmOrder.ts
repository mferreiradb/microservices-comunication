import IOrderRepository from '../repositories/OrderRepository';

export default class ConfirmOrder {
     
  constructor(
        readonly orderRepository: IOrderRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const order = await this.orderRepository.getById(input.orderId);

    if (input.status === 'success') {
      order.confirm();
      await this.orderRepository.update(order);
    }
  }
}

type Input = {
    orderId: string;
    status: string;
}