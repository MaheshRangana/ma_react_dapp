import React, { Component } from 'react';
import TransactionDetails from './transaction-details'

class EventDetails extends Component {

  render() {
    const { unsealedEvent, web3objs } = this.props;

    return (
      <div>
        <div className="events">
            <div className="title event-title">Event Details</div>
            <div className="events-content">
              <div className="events-detail">
                <span>Hash:</span> 
                {unsealedEvent.returnValues.hash}
              </div>
              <div className="events-detail">
                <span>Owner:</span> 
                {unsealedEvent.returnValues.owner}
              </div>
              <div className="events-detail">
                <span>Status:</span> 
                {unsealedEvent.returnValues.status}
              </div>
              <div className="events-detail">
                <span>values:</span> 
                {unsealedEvent.returnValues.value}
              </div>
            </div>

            <TransactionDetails 
              transactionHash={unsealedEvent.transactionHash} 
              web3objs={web3objs}
              />
          </div>
      </div>
    )
  }
}


export default EventDetails;
