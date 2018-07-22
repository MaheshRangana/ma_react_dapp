
## ma_dapp
This application will connect to the local node and read past events from the given contract. Setting file has option to choose event type, contract address and ABI. Currently, this app uses HTTP connection and it can be changed to WebSocket or any other remote provider.


## Steps to run dapp 
  Prerequisites - nodejs, web3, parity or geth
  
  Inside the project folder - 

  Run npm install 

  Run npm start, app can be accessed in localhost:3000



## Folder Structure

  Api - 

    web3Interface.js - Web3 API callings

  Constants -

    settings.js - Define constants such as URL, ABI and address

  Components -

	  event-details.js - Display past event details for specific event
	  transaction-details.js - Display transaction details for selected event
  
  App.js - Initiate the application

  App.css