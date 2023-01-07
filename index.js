const Blockchain = require('./src/blockchain');
const Block = require('./src/block');

async function main() {
    const blockchain = new Blockchain();
    const firstBlock = new Block({ data: "Block #1 "});
    const secondBlock = new Block({ data: "Block #2 "});
    const thirdBlock = new Block({ data: "BLock #3 "});

    await blockchain.addBlock(firstBlock);
    await blockchain.addBlock(secondBlock);
    await blockchain.addBlock(thirdBlock);

    blockchain.print();
}

main();
