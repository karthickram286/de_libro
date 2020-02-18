const amqp = require('amqplib');
const config = require('config');

const mqProtocol = config.get('mq-protocol');
const BOOK_QUEUE = config.get('bookQueueName');

async function bookConsumer() {
    try {
        console.log(`Consumer started for queue: ${BOOK_QUEUE}`);
        const connection = await amqp.connect(`${mqProtocol}://localhost`);
        const channel = await connection.createChannel();
        await channel.assertQueue(BOOK_QUEUE);

        channel.consume(BOOK_QUEUE, (message) => {
            const book = JSON.parse(message.content.toString());
            console.log(`New Book added to DB, Name: ${book.name}, Price: ${book.price}, Quantity: ${book.quantity}`);
        }, {
            noAck: true
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = bookConsumer;