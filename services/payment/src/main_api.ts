import express, { Request, Response } from 'express';
const app = express();

app.use(express.json());

app.post('/process_payment', (req: Request, res: Response) => {
    console.log('processPayment', {...req.body, time: new Date().toISOString()});
    const input = req.body;
    res.json({
        orderId: input.orderId,
        status: 'success',
    })
})

app.listen(3001, () => {
  console.log('Payment service is running on port 3001');
});