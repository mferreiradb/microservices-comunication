interface IQueue {
    connect(): Promise<void>;
    consume(queueName: string, callback: (input: any) => any): Promise<void>;
    publish(queueName: string, data: any): Promise<void>;
}

export default IQueue;