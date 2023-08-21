import { ethers, BigNumber } from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token';

export  async function Create( name, symbol , initialSupply , signer ) {
  const factory = new ethers.ContractFactory(
    Token.abi,
    Token.bytecode,
    signer
  );
  return factory.deploy(name, symbol, Number(initialSupply));
}


export async function pause(address, signer){
    const token = new ethers.Contract(address, Token.abi , signer);
    await token.pause();
}


export async function unPause(address, signer){
  const token = new ethers.Contract(address, Token.abi , signer);
  await token.unpause();
  
}


export async function mint(address, signer, amount){
  const beneficiary = await signer.getAddress();
  const token = new ethers.Contract(address, Token.abi , signer);
  const bigAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(18));
  const transaction = await token.mint( beneficiary , bigAmount);
  

}

export async function burn( address, signer ,amount ){

  const token = new ethers.Contract( address, Token.abi, signer );
  const bigAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(18));
  console.log('Inside ');
  console.log(token);
  await token.burn(bigAmount);
}


















