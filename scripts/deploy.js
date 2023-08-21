const {ethers, run} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const weiAmount = (await deployer.getBalance()).toString();
    
    console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));
  
    const Token = await ethers.getContractFactory("Token");
    const name  = "GOLD";
    const symbol = "GDX";
    const initialSupply = 100;
    const args = [name ,symbol, initialSupply];
    const token = await Token.deploy(name , symbol, initialSupply);

    console.log("Token address:", token.address);
    const image = 'https://media.istockphoto.com/id/1366880501/photo/golden-heraldry-pattern-design-on-banknote.jpg?b=1&s=170667a&w=0&k=20&c=5RpY4qlkGTFVow2pGOifxTw17XcZG-mWd9VpRksI11s=';
   

    // doesnt' want verfication now 
    
    console.log(`Waiting for blocks confirmations...`);
    await token.deployTransaction.wait(6);
    console.log(`Confirmed!`);

    await verify( token.address, args );

    

  }

  const verify = async (contractAddress, args) => {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            contract : "contracts/Token.sol:Token", 
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(e);
        }
    }
};

  
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });