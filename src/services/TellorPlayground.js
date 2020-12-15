import {TellorPlaygroundArtifacts} from "@/assets/contracts/TellorPlayground";

export class TellorPlayground{
    constructor(web3, senderAddress, contractAddress) {
        this.web3 = web3;
        this.senderAddress = senderAddress;
        this.buildFromAddress(contractAddress);
    }

    buildFromAddress(contractAddress){
        this.playground =  new this.web3.eth.Contract(TellorPlaygroundArtifacts.abi, contractAddress);
    }

    async retrieveData(id, timestamp){
        return await this.playground.methods.retrieveData(id, timestamp).call({
            from: this.senderAddress,
        });
    }

    async getNewValueCountbyRequestId(id){
        return await this.playground.methods.getNewValueCountbyRequestId(id).call({
            from: this.senderAddress,
        });
    }

    async getTimestampbyRequestIDandIndex(id, index){
        return await this.playground.methods.getTimestampbyRequestIDandIndex(id, index).call({
            from: this.senderAddress,
        });
    }

    submitValue(id, value, onTransactionHash, onReceipt, onError){
        this.playground.methods.submitValue(id, value).send({
            from: this.senderAddress,
        })
            .on('transactionHash', onTransactionHash)
            .on('receipt', onReceipt)
            .on('error', onError);
    }
}