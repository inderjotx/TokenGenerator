import { useState,useEffect } from 'react'
import {Create, burn, mint, pause , unPause} from './createToken';
import { ethers,  } from 'ethers'
import Background from './Background.svg'
import CreateForm from './CreateForm.svg'
import { Button, Form, Input, Row, Col, Select } from 'antd';
const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
import './App.css'


const ID = {
  "mainnet": "0x1",
  "goerli": "0x5",
  "polygon": "0x89",
  "sepolia" : "0xaa36a7",
  "mumbai" : "0x13881"
}

const hide =  {
  display : 'none'
}

const inputStyle = { color: '#9191CB', borderColor: '#9191CB', background : '00000'}

const home = {
  backgroundImage: `url('${Background}')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100vh',
  position: 'relative'
}

const lableStyle = {
  color: '#9191CB' 
}

const form = {
  backgroundImage: `url('${CreateForm}')`,
backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100vh',
  position: 'relative'
}

function App() {


  const [account, setaccount] = useState('')
  const [currentPage, setCurrentPage] = useState('home')
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
    await token.deployTransaction.wait(3);
    settokenAddress(token.address);
    addOnMetaMask();

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
    try {
      // wasAdded is a boolean. Like any RPC method, an error can be thrown.
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', 
          options: {
            address: tokenAddress,
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
            decimals: 18, // The number of decimals in the token.
            image: tokenUrl, // A string URL of the token logo.
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


  async function changeChain(e){
    const chainName = e;
    console.log(chainName);
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ID[chainName] }],
    });
  }



  return (
    
    <> 
    { 
      (currentPage === 'home')
       &&
      <section id='home'>
          <div style={home}>
              <div style={{ position : 'absolute', left : '118px', top: '346px'}}>
                  <Button
                        ghost
                        type="primary"
                        shape="round"
                        size='large'
                        style={{ borderColor :'#08FFE1' , color : '#08FFE1' }}
                        onClick={() => setCurrentPage("create")}
                      >
                        Get Started
                  </Button>
              </div>
          </div>
      </section>
    }
      {
        (currentPage === 'create')
        &&
        <section id='create' style={form}>
        <div
        style={{
          display: 'flex',
          justifyContent : 'end',
        }}>
                <Select
                defaultValue="mumbai"
                style={{
                  width: 150,
                  padding: "8px 10px 0 0" 
                }}
                onChange={changeChain}
                options={[
                  {
                    value: 'goerli',
                    label: 'Goerli',
                  },
                  {
                    value: 'mainnet',
                    label: 'Mainnet',
                  },
                  {
                    value: 'polygon',
                    label: 'Polygon',
                  },
                  {
                    value: 'mumbai',
                    label: 'Mumbai',
                  },
                  {
                    value: 'sepolia',
                    label: 'Sepolia',
                  },
                ]}
              />
     </div>


           
    <div
    style={{
      display: 'flex',
      justifyContent: 'center', 
      // alignItems: 'center',
      height: '80vh',
      img:{Background}
    }}
  >
    <div style={{position:'absolute', width: '30%', top: '250px' }}>
      <Form>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="Token Name" style={{ color : '#9191CB'}}  labelCol={{ span: 24 }}>
              <Input style={inputStyle}   value={tokenName} onChange={ (e) => { setTokenName(e.target.value)}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Token Symbol" style={lableStyle}  labelCol={{ span: 24 }}>
              <Input style={inputStyle} value={tokenSymbol} onChange={ (e) => { setTokenSymbol(e.target.value)}} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Token Logo URL" style={lableStyle}  labelCol={{ span: 24 }}>
              <Input style={inputStyle} value={tokenUrl} onChange={ (e) => { setTokenUrl(e.target.value)}}/>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item label="Initial Supply" style={lableStyle}  labelCol={{ span: 24 }}>
              <Row>
                <Col span={12}>
                  <Input style={inputStyle}  type='number' value={tokenInitialSupply} onChange={ (e) => { setInitialSupply(e.target.value)}}  />
                </Col>

                <Col gutter={4} span={6}>
                  <Button
                    size="middle"
                    type="primary"
                    style={{
                      marginLeft: 10,
                      backgroundColor: '#9191CB',
                      alignSelf: 'flex-end',
                    }}
                    loading={false}
                    onClick={deployToken}
                  >
                    Create
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
        </section>
     }

     {
      (currentPage === 'console')
      &&
      <section id='console'>

      </section>
     }
</>
  )
}

export default App

{/* <img src={Background} alt="Background image " /> */}