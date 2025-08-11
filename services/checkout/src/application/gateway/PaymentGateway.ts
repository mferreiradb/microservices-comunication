interface IPaymentGateway {
    processPayment(input: Input): Promise<Output>;
}
export type Input = {
    orderId: string;
    amount: number;
    cardToken: string;
}

export type Output = {
    orderId: string;
    status: string;
}

export default IPaymentGateway;