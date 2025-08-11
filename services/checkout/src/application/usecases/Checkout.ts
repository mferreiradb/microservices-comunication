import Order from '../../domain/Order';
import IQueue from '../../infra/queue/Queue';
import IPaymentGateway from '../gateway/PaymentGateway';
import ICourseRepository from '../repositories/CourseRepository';
import IOrderRepository from '../repositories/OrderRepository';

export default class Checkout {
     
  constructor(
        readonly orderRepository: IOrderRepository,
        readonly courseRepository: ICourseRepository,
        readonly paymentGateway: IPaymentGateway,
        readonly queue: IQueue
  ) {}

  async execute(input: Input): Promise<Output> {
    const course = await this.courseRepository.getById(input.courseId);
    if (!course) {
      throw new Error('Course not found'); 
    }
        
    const order = Order.create(input.courseId, input.name, input.email, course.amount);
    await this.orderRepository.save(order);
    // chamada sincrona
    // const inputProcessPayment = {
    //   orderId   : order.orderId,
    //   amount    : course.amount,
    //   cardToken : input.cardToken
    // };

    // const outpuProcessPayment = await this.paymentGateway.processPayment(inputProcessPayment);

    // if (outpuProcessPayment.status === 'success') {
    //   order.confirm();
    //   await this.orderRepository.update(order);
    // }

    // chamada assincrona
    // deixar claro no nome da fila o que já aconteceu
    // os indteressados no evendo de order_placed farão o que tiverem interesse de fazer
    const orderPlacedEvent = {
      orderId   : order.orderId,
      amount    : course.amount,
      cardToken : input.cardToken
    };
    await this.queue.publish('order_placed', orderPlacedEvent);

    return {
      orderId: order.orderId
    };
        
  }
}

type Input = {
    courseId: string
    name: string
    email: string
    cardToken: string
}
    
type Output = {
    orderId: string
}