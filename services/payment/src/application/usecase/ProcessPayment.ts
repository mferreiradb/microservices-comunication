import IQueue from "../../queue/Queue";

export default class ProcessPayment {
    constructor(readonly queue: IQueue) {}

    async execute(input: Input): Promise<void> {
        const paymentAprovedEvent = {
            orderId: input.orderId,
            status: 'success'
        }
        await this.queue.publish('payment_aproved', paymentAprovedEvent)
        console.log('payment_aproved ', input)
    }
}

type Input = {
    orderId: string;
    amount: number;
    cardToken: string;
}

type Output = {
    orderId: string;
    status: string;
}