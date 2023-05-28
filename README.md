# Token X 
### Live https://token-generator-git-master-inderharrysingh.vercel.app/

## Problem Statement 
    It is difficult to create tokens on the Ethereum chain without an understanding of Smart Contracts. It can also be cumbersome to manage token supply, such as burning and minting new tokens based on market trends, and pausing token transactions during any untoward events.

## Solution

  Token X is an app that provides an abstraction layer over low-level  token implementation on Ethereum chain. It offers a clean UI for users to interact with to create and manage their tokens using the console, where all their owned tokens are pre-populated. on ethereum chain and provide clean UI for user to interact with to create token and manage them using the console, where all their owned tokens are pre-populated. 

    Extra Features
    1. Select a logo for the token using Dalle-AI and Unsplash .
    2. Automatically adds tokens to the MetaMask wallet after successful creation to keep track.
    3. Can deploy Token on any EVM chain
    4. Mint more token after deployement 


### How it does it 
At the time of creation using the client specification, the app deploys an ERC-20 smart contract by OpenZeppelin and uses the functions in the same contract to manage the tokens. It uses MongoDB as a database to store the token. Using the Unsplash and Dalle APIs, it makes calls to the express backend for images.

<br>


## How to set Up Project Locally

The root directory is a simple Hardhat project that I used to play with smart contract and MetaMask API. However, you don't need this. Here's what you'll need:

    Backend => ./Backend
    Frontend => ./Frontend


### Commands
```shell
    git clone https://github.com/inderharrysingh/TokenGenerator.git
    cd backend
    npm install 
    // add .env , add environment variable for UNSPLASH_API, OPENAI_API , URL => for mongo db 
    node server.js


    cd ..
    cd frontend
    npm install
    npm run dev 


```

