import axios from 'axios';
import IPaymentGateway, { Input, Output } from '../../application/gateway/PaymentGateway';

export default class PaymentGatewayHttp implements IPaymentGateway {
  async processPayment(input: Input): Promise<Output> {
    const response = await axios.post('http://localhost:3001/process_payment', input);
    return response.data;   
  }

}