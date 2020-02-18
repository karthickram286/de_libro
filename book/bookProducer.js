const amqp = require('amqplib');
const config = require('config');

const mqProtocol = config.get('mq-protocol');
const BOOK_QUEUE = config.get('bookQueueName');

async function bookProducer(name, price, quantity) {
    try {
        const connection = await amqp.connect(`${mqProtocol}://localhost`);
        const channel = await connection.createChannel();
        await channel.assertQueue(BOOK_QUEUE);

        channel.sendToQueue(BOOK_QUEUE, Buffer.from(JSON.stringify({ name, price, quantity })));
        console.log('Book produced');
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = bookProducer;