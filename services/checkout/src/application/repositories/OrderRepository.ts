import Order from '../../domain/Order';

interface IOrderRepository {
    save(order: Order): Promise<void>
    udpate(order: Order): Promise<void>
    getById(id: string): Promise<Order>
}

export default IOrderRepository;