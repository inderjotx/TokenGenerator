import { useState,useEffect } from 'react'
import {Create, burn, mint, pause , unPause} from './createToken';
import { ethers,  } from 'ethers'
import Background from './Background.svg'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from '@chakra-ui/react'

const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
import './App.css'


const ID = {
  "mainnet": "0x1",
  "goerli": "0x5",
  "polygon": "0x89",
  "sepolia" : "0xaa36a7",
  "mumbai" : "0x13881"
}

function App() {


  const [account, setaccount] = useState('')
  const [signer, setSigner] = useState('')
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const [tokenInitialSupply, setInitialSupply] = useState();
  const [tokenAddress, settokenAddress] = useState("")
  



  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);
      setaccount(accounts[0]);
      setSigner(provider.getSigner());
    }
    getAccounts();
  }, [])


  async function deployToken(){
    console.log('deploying ...')
    console.log(tokenName);
    console.log(tokenSymbol);
    console.log(tokenInitialSupply);
    console.log(signer);
    const token = await Create(tokenName, tokenSymbol, tokenInitialSupply, signer);
    settokenAddress(token.address);

  }

  async function burnToken(){
    // await burn( "0x1Ab25c8625c67B62C94a7d02935b1ec578591FBb", signer, 3);
    // await mint( tokenAddress , signer, 100, account);
    await unPause("0x1Ab25c8625c67B62C94a7d02935b1ec578591FBb", signer);

    console.log("burned")
  }

  async function getMoreTokens(){
     await mint( tokenAddress , signer, 100, account);
  }

  async function addOnMetaMask(){
     console.log(tokenAddress);
      const result =   await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: account,
              symbol: tokenSymbol,
              decimals: 18,
              image: tokenUrl,
            },
          },
        })
        .then((success) => {
          if (success) {
            console.log('Token successfully added to the wallet ');
          } else {
            throw new Error('Something went wrong.');
          }
        })
        
      
  }


  async function changeChain(e){
    const chainName = e.target.value;
    console.log(chainName);
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ID[chainName] }],
    });
  }

  return (
    <>
    <img src={Background} alt="Background image " />
    <FormControl>
            <FormLabel>Account : {account}</FormLabel>
            <FormLabel>Token : {tokenAddress}</FormLabel>
            <Select placeholder='Change Chain'  variant='outline' size='md' onChange={changeChain}>
                  <option value='goerli' >Goerli</option>
                  <option value='mainnet' >Mainnet</option>
                  <option value='polygon' >Polygon</option>
                  <option value='mumbai' >Mumbai</option>
                  <option value='sepolia' >Sepolia</option>
            </Select>
            <FormLabel>Name : {tokenName}</FormLabel>
            <FormLabel>Symbol : {tokenSymbol}</FormLabel>
            <FormLabel>Initial : {tokenInitialSupply}</FormLabel>
            <FormLabel>Token Name</FormLabel>
              <Input type='text' value={tokenName} onChange={ (e) => { setTokenName(e.target.value)}}/>
            
              <FormLabel>Symbol</FormLabel>
              <Input type='text' value={tokenSymbol} onChange={ (e) => { setTokenSymbol(e.target.value)}}/>
              
              <FormLabel>Initial Supply</FormLabel>
            <Input type='text' value={tokenInitialSupply} onChange={ (e) => { setInitialSupply(e.target.value)}}  />

              <FormLabel>Logo Url</FormLabel>
            <Input type='url' value={tokenUrl} onChange={ (e) => { setTokenUrl(e.target.value)}}/>

            <Button colorScheme='blue' onClick={deployToken}>Button</Button>
            <Button colorScheme='green' onClick={addOnMetaMask}>Add on MetaMask</Button>
            <Button colorScheme='green' onClick={getMoreTokens}>Mint</Button>
            
    </FormControl>
 
    </>
  )
}

export default App
