import Order from '../../domain/Order';
import ICourseRepository from '../repositories/CourseRepository';
import IOrderRepository from '../repositories/OrderRepository';

export default class Checkout {
    
  constructor(
        readonly orderRepository: IOrderRepository,
        readonly courseRepository: ICourseRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const course = await this.courseRepository.getById(input.courseId);
    if (!course) {
      throw new Error('Course not found'); 
    }
        
    const order = Order.create(input.courseId, input.name, input.email, course.amount);
    await this.orderRepository.save(order);

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