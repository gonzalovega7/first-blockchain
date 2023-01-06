const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');
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
        this.previousBlockHash = '';                                   // hash from the previous block
    }

    // Validation that the block is correct and was not tampered 
    validate() {
        const self = this;
        return new Promise((res, rej) => {
            let currentHash = self.hash;

            // Check the hash again to see if the new one generated is equal to the previous one
            self.hash = SHA256(JSON.stringify({...self, hash: null})).toString();
            if(currentHash != self.hash) {
                return res(false);
            }

            res(true);
        })
    }

    getBlockData() {
        const self = this;
        return new Promise((res, rej) => {
            // This encodedData, is the encoded body of my current block
            let encodedData = self.body;
            
            // Changing format to 'text' 
            let decodedData = hex2ascii(encodedData);

            // Now we parse the 'text' into an object
            let dataObject = JSON.parse(decodedData);

            if(dataObject === 'Genesis Block') {
                rej(new Error("This is the Genesis Block"))
            }
            res(dataObject);
        })
    }

    // method to display in console the block information 
    toString() {
        const { hash, height, body, time, previousBlockHash } = this;
        return `Block - 
            hash: ${hash}
            heigth: ${height}
            body: ${body}
            time: ${time}
            previousBlockHash: ${previousBlockHash}
            --------------------------------------`;
    }

}
module.exports = Block;