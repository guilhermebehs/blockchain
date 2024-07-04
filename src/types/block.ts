export type Block = {
    payload:{
        id: number,
        data:any,
    }
    nonce: number,
    hash: string
    prevHash:string
   }