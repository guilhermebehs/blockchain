import { Block } from "./types/block"
import { hash } from "./utils"
import { MineResult } from "./types/mine-result"

export class BlockChain{
    private blocks: Block[]
    private difficult:number
    private prefix: string

    constructor(difficult:number,prefix: string){
        this.blocks = [this.createGenesisBlock()]
        this.difficult = difficult
        this.prefix = prefix
    }

    createBlock(data:any):Block{
        const payload = {
            id:this.blocks.length,
            data
         }
        const prevHash = this.getPreviousHash()
        const mineResult = this.mine(payload,prevHash)

        return {
         payload,
         prevHash,
         hash:mineResult.hash,
         nonce: mineResult.nonce
        }
     }

     private mine(payload:{id:number, data:any}, prevHash:string): MineResult{
        let nonce = 0

        while(true){
            const dataToBeHashed = {
                ...payload,
                prevHash,
            }
            const hashResult = hash(nonce+JSON.stringify(dataToBeHashed))
            if(hashResult.startsWith(this.prefix.repeat(this.difficult)))
               return {
                hash: hashResult,
                nonce
            }
            nonce++
        }
     }


    insertBlock(block:Block){
        if(block.prevHash !== this.getPreviousHash()){
            console.error(`Block with id ${block.payload.id} has invalid previous hash`)
            return
        }
        if(!this.isMined(block)){
            console.error(`Block with id ${block.payload.id} is not mined!`)
            return
        }
        this.blocks.push(block) 
        console.log(`Block with id ${block.payload.id} inserted!`)
    } 

   private isMined(block:Block):boolean{
        const {payload, prevHash,nonce} = block
        const dataToBeHashed = {
              id: payload.id, 
              data: payload.data,
              prevHash: prevHash,
        }
        const hashResult = hash(nonce+JSON.stringify(dataToBeHashed))
        return hashResult.startsWith(this.prefix.repeat(this.difficult))
    }

    private createGenesisBlock():Block{

       const payload = {
        id:0,
        data: '',
       }
       const nonce = 0

       return {
        payload,
        prevHash:'',
        hash: hash(nonce+JSON.stringify(payload)),
        nonce
       }
    }

    private getPreviousHash():string{
         return this.blocks[this.blocks.length -1].hash
    }
    
}