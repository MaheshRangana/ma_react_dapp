import React, { Component } from 'react';
import logo from './slock_logo.png';
import './App.css';

import 'web3';
import web3Interface from './api/web3Interface';
import EventDetails from './components/event-details';
import { RPC_URL, EVENT_TYPE, CONTARCT_ADDRESS, CONTARCT_ABI } from './constants/settings';


class App extends Component {
  constructor(props) {
    super(props);
    
    /*
     * define states
     * isConnected - connection health 
     * isError - set error state
     * pastEvents - events object, keep all past events
     */
    this.state = {
      isConnected: false,
      isError: false,
      pastEvents: [] 
    };
   
    //Instatiates to web3interface
    this.web3objs = new web3Interface(RPC_URL);
  }

  /*
   * Set status - pastEvents or error
   */ 
  getPastEvents() {
    this.web3objs.fetchBidRevealed(CONTARCT_ABI, CONTARCT_ADDRESS, EVENT_TYPE)
      .then((events) => {
        //console.log(events.length);
        console.log(events);
        if(events.indexOf("Error") >= 0) {
          this.setState({
            isError: true
          })
        } else {
          this.setState({
            pastEvents: events
          });
        }

      });
  }

  /*
   * Call before mount
   */
  componentWillMount() {
    this.web3objs.healthProb()
      .then((connection) => {
        if(connection.indexOf("Error") >= 0) {
          this.setState({
            isConnected: false
          });
        } else{
          this.setState({
            isConnected: true
          });
        }
      });

    this.getPastEvents();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Slock.it</h1>
          <h5>
            {
              this.state.isConnected?'Connected to local node':'Not connected to local node'
            }
          </h5>
        </header>
        <div className="App-intro">
           <h4 className="error-message">
            {
              this.state.isError ? 'Something went wrong, Please check later again':''
            }
           </h4>
          
           <div className="top-div">
            <div className="top-address">Contract address
              <span>{CONTARCT_ADDRESS}</span>
            </div>
            <div className="top-eventscount">Events count
              <span>{this.state.pastEvents.length}</span>
            </div>
            <div className="">Events type
              <span>{EVENT_TYPE}</span>
            </div>
           </div>
            
           <div className="main-content">
            <h3 className="main-title">Events</h3>
            
            {
              !this.state.isError &&
              this.state.pastEvents.map((event) =>
                <EventDetails 
                  key={event.id}
                  unsealedEvent={event} 
                  web3objs={this.web3objs}
                  />
              )
            }
           </div>
        </div>
      </div>
    );
  }
}

export default App;
