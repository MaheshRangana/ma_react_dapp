import React, { Component } from 'react';

class TransactionDetails extends Component {
  constructor(props){
    super(props);
    
    /*
     * define states
     * transactionDetails - transaction object, keep all tranaction details
     */
    this.state = {
      transactionDetails: [],
      showTransaction: "hidden"
    };
  }

  //call before mounts
  componentWillMount(){
    //get transaction details if transaction hash available
    if(this.props.transactionHash){
      this.getTransactionDetails(this.props.transactionHash);
    }
  }
  
  /*
   * @param {transactionHash}
   * Set transaction state with transaction details
   */
  getTransactionDetails(transactionHash) {
    this.props.web3objs.getTransactionDetails(transactionHash)
    .then((transactionDetails) => {
      this.setState({
        transactionDetails: transactionDetails
      });
      console.log(transactionDetails);
    });
  }

  /*
   * Event handler
   * Set state for showTransaction - hidden or show 
   */
  toggleTransactionDetails() {
    var showorHidden = (this.state.showTransaction === "hidden") ? "show" : "hidden";
    this.setState({
      showTransaction:showorHidden
    });
  }

  render() {
    return (
        <div className="transaction">
            <div className="title" onClick={this.toggleTransactionDetails.bind(this)}>
              Transaction Details <span>(Click here)</span>
            </div>
            <div className={ `transaction-content ${this.state.showTransaction}` }>
              <div className="transaction-detail">
                <span>Hash:</span> 
                {this.props.transactionHash}
              </div>
              <div className="transaction-detail">
                <span>From:</span> 
                {this.state.transactionDetails.from}
              </div>
              <div className="transaction-detail">
                <span>to:</span> 
                {this.state.transactionDetails.to}
              </div>
              <div className="transaction-detail">
                <span>values:</span> 
                {this.state.transactionDetails.value}
              </div>
              <div className="transaction-detail">
                <span>Gas Price:</span> 
                {this.state.transactionDetails.gasPrice}
              </div>
              <div className="transaction-detail">
                <span>Gas:</span> 
                {this.state.transactionDetails.gas}
              </div>
            </div>    
          </div>
    )
  }
}


export default TransactionDetails;
