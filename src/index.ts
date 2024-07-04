import { BlockChain } from "./blockchain";
import { hash } from "./utils";



const blockchain = new BlockChain(4, '0')

//insert valid block
const block1 = blockchain.createBlock('hello')
blockchain.insertBlock(block1)

//insert valid block
const block2 = blockchain.createBlock('hello2')
blockchain.insertBlock(block2)

//insert block not mined
blockchain.insertBlock({
    payload:{
        id: 3,
        data:''
    },
    prevHash:block2.hash,
    hash: hash(1+JSON.stringify('')),
    nonce:1
})