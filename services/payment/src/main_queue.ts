import ProcessPayment from "./application/usecase/ProcessPayment";
import RabbitMQAdapter from "./queue/RabbitMQAdapter";

async function main() {
    const queue = new RabbitMQAdapter();
    const processPayment = new ProcessPayment(queue);
    await queue.connect()
    queue.consume('order_placed', async (input: any) => {
        console.log('Order placed event received:', {...input, processedAt: new Date().toISOString()});
        await processPayment.execute(input)
    })
}

main();