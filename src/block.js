const SHA256 = require('crypto-js/sha256');

/* 
Each block has a hash, and this is formed with the information that it contains. 
On the other hand, it also has a previous hash referencing the previous block.
*/
class Block {
    constructor(data) {
        this.hash = null;                                              // we calculate the hash with all the data from the block
        this.height = 0;                                               // number of the block inside the chain
        this.body = Buffer.from(JSON.stringify(data).toString('hex')); // body of the block
        this.time = 0;                                                 // time 
        this.previousBlockHash = 0;                                    // hash from the previous block
    }
}

module.exports = Block;