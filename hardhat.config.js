require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
  networks : {
    goerli : {
      url : process.env.GOERLI,
      accounts : [process.env.ACCOUNT]
    }
  },

 
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY
    }
  

};
