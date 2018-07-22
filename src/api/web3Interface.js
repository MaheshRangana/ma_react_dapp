import Web3 from 'web3';

class web3Interface {
  constructor(rpcURL) {
    //instantiate to web3
    this.web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
  }

  /*
   * @param {contractABI} The json interface for the contract to instantiate.
   * @param {contractAddress} The address of the smart contract to call.
   * @param {eventType} Events type. EX- allEvents, BidRevealed
   * @return {json object} Return all result which matches to particular events 
   */
  fetchBidRevealed(contractABI, contractAddress, eventType) {
    //get the contract object
    var pastContract = new this.web3.eth.Contract(contractABI, contractAddress, {});
    
    //get events details
    return pastContract.getPastEvents(eventType, {
      fromBlock: 0,
      toBlock: 'latest',
      })
      .then((events) => events)
      .catch((error) => {
        //console.log("Failed with error: " + error);
        return "Error: can't get the events";
      }); 
  }

  /*
   * @param {transHash} Transaction hash
   * @return {json object} Return tranaction details 
   */
  getTransactionDetails(transHash){
    return this.web3.eth.getTransaction(transHash)
     .then((transaction) => transaction)
     
  }

  /*
   * @param {blockNumber}
   * @return {json object} Return block details 
   */
  getBlockDetails(blockNumber){
    return this.web3.eth.getBlock(blockNumber)
    .then((block) => block)
  }

  
  /*
   * Return true if connection is made
   */
  healthProb() {
    return this.web3.eth.net.isListening()
      .then(() => "Connection is listening")
      .catch((e) => "Error : Connection failed.");
  }
}

export default web3Interface;