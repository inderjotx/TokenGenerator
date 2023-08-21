// use this code in the front end of the app
const { ethers } = require('hardhat');


async function register(address, name , symbol , decimal , image ){

// get ethereum using the metamask 
  

  try {
    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', 
        options: {
          address: address, 
          symbol: symbol, 
          decimals: decimal, 
          image: image ,
        },
      },
    });
  
    if (wasAdded) {
      console.log('Thanks for your interest!');
    } else {
      console.log('Your loss!');
    }
  } catch (error) {
    console.log(error);
  }
  }



export default register;