import { useState,useEffect } from 'react'
import {Create, burn, mint, pause , unPause} from './createToken';
import { ethers,} from 'ethers'
import Card from './Card';
import MetaMask from './MetaMask';
import Background from './Background.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { Button,  Select, Drawer , Radio} from 'antd';
const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
import './App.css'


const ID = {
  "mainnet": "0x1",
  "goerli": "0x5",
  "polygon": "0x89",
  "sepolia" : "0xaa36a7",
  "mumbai" : "0x13881"
}


const home = {
  backgroundImage: `url('${Background}')`,
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
  const [ chainName, setchainName ] = useState("");
  const [tokenData, settokenData] = useState([])
  const [isCreating , setisCreating ] = useState(10);
  const [ open, setOpen ] = useState(false);
  const [ imageEndPoint , setImageEndPoint] = useState('unsplash');
  const [prompt, setprompt] = useState("")
  const [ imageData, setImageData ] = useState([]);
  const [ finding, setfinding ] = useState(10);
  const [isActive, setisActive] = useState(false);



 





  useEffect(() => {
    console.log(account);
    getPrevTokens().then(tokens => {
      settokenData(tokens);
    }).catch(error => {
      console.error(error);
    });
  }, [account, isCreating ]);



  useEffect ( () => {

    if (isActive)  {
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then( ( accounts) => {
        if ( accounts[0] != account){
          setSigner(provider.getSigner())
          setaccount(accounts[0]);
          
        }
      })

    }
    else{
      console.log("No active yet")
    }


  })


  function makeDefault(){
    setTokenName("");
    setTokenSymbol("");
    setTokenUrl("");
    setInitialSupply("");
  }



  async function deployToken(){
    setisCreating(0);
    try{
      const token = await Create(tokenName, tokenSymbol, tokenInitialSupply, signer);
      const contractAddress = token.address;
      await token.deployTransaction.wait(3);
      await storeToken(contractAddress);
      setisCreating(1);
      makeDefault();
      await addOnMetaMask(contractAddress);

    }
    catch {
      setisCreating(-1);
    }
   

  }

  

  async function addOnMetaMask(contractAddress){
    try {
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', 
          options: {
            address: contractAddress,
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
    const prevChain = chainName;
    console.log(e);
    try{
      const response = await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ID[e] }],
      });

      setchainName(e);
      console.log("Chain changed successfully")

    }
    catch(error){
      console.log("Unable to change the chain");

    }

  }


  async function storeToken(contractAddress){

      
    const object = {
      creator : account,
      imageUrl : tokenUrl,
      name : tokenName,
      symbol : tokenSymbol,
      chain : chainName,
      contract : contractAddress
    }

    console.log(object);

    fetch('https://backend-token-generator.vercel.app/tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(object)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });

  }

 

  

  async function getPrevTokens() {
      const response = await fetch(`https://backend-token-generator.vercel.app/tokens?address=${account}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      console.log(data)
      return data;
    }



    async function getImages(){
     
        setfinding(0);
        setImageData([]);
        fetch(`https://backend-token-generator.vercel.app/${imageEndPoint}?query=${prompt}`, {
          method : "GET",
          headers  : {
            'Content-Type': 'application/json'
          }
      }).then(
        response => {
          if ( !response.ok ){
            throw new Error (" Bad request");
          }

          return response.json();
        }
      ).then(
        data => {
          console.log(data);
          setImageData(data);
          setfinding(1);
        }
      )
      .catch( error => {
        console.log(error);
        setfinding(-1);
      })

      console.log(imageData);
    
     
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
    <div
        style={{
          display: 'flex',
          justifyContent : 'end',
          height:'45px',
          alignItems : 'center',
         position : 'fixed',
         right : '5px'
          
        }}>
        <button className='create explore' style={{ marginTop : '10px'}} value={ currentPage == 'console' ? "create" : "console"}  onClick={(e) => setCurrentPage(e.target.value)} >{currentPage == 'console' ? "Create" : 'Console'}</button>
                <MetaMask  provider={provider} setSigner={setSigner} setaccount={setaccount} setchainName={setchainName} isActive={isActive} setisActive={setisActive} />
                
                <Select
                style={{
                  width: 130,
                  margin: "8px 10px 0 0" 
                }}
                value={chainName}
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
      {
        (currentPage === 'create')
        &&
        <section id='create'>

        <div style={{ display : 'flex', justifyContent : 'center' , alignItems : 'center'}} >
            <h1 className='heading' style={{ color : 'rgb(243, 45, 184)', textShadow: '2px 2px 5px #FF007F'}}>Create</h1>
        </div> 
      <div className='parent' style={{ padding : '25px', margin:'1% 20%', borderRadius : '20px'}}>
        <div className="container" style={{ margin : '5% auto'}}>
              <div style={{ display:"flex",  flexFlow : 'row wrap' , gap: '30px'}}> 
                  <input className="input" disabled={isCreating==0 ? true : false}  autoComplete='lodahasan' value={tokenName} onChange={ (e) => { setTokenName(e.target.value)}}  placeholder='Token Name' type="text" required="true" style={{ flex : 2 }} />
                  <input className="input" disabled={isCreating==0 ? true : false}  autoComplete='off' placeholder='Token Symbol' type="text" required="true"  style={{ flex : 1}} value={tokenSymbol} onChange={ (e) => { setTokenSymbol(e.target.value)}} />
              </div>
              <div style={{ display : 'flex', flexFlow : 'row wrap' , justifyContent : "flex-end", gap : "20px"}}>
              <input className="input" disabled={isCreating==0 ? true : false} placeholder='Logo URL' autoComplete='off'  type="text" required="true" style={{ flex :'auto'}} value={tokenUrl} onChange={ (e) => { setTokenUrl(e.target.value)}} />
              <button className='create explore' disabled={isCreating==0 ? true : false} onClick={ () => setOpen(true)}>Explore</button>
              </div>
              <div style={{ display : 'flex', justifyContent : 'space-between'}}>
              <input className="input" disabled={isCreating==0 ? true : false} placeholder='Initial Supply' value={tokenInitialSupply} onChange={ (e) => { setInitialSupply(e.target.value)}}  autoComplete='off' type="number" required="true"  />
              
              <div style={{ display : 'flex', flexDirection:'row' , gap: '20px' , alignItems: 'center'}}>
              <div className={ isCreating == 0 ? 'spinner' : isCreating == 1 ? 'success' : isCreating == -1 && 'fail'}></div>
              <button className='create' disabled={isCreating==0 ? true : false} onClick={deployToken} >Create</button>
              </div>

            
            </div>
        </div>
        </div>
        <Drawer
            title="Select Logo"
            placement="left"
            closable={false}
            headerStyle={ { background : '#10bebe', color : '#fff'}}
            bodyStyle={{ background : '#353935'}}
            onClose={() => setOpen(false)}
            open={open}
          >
          <div style={{ display : "flex" , flexFlow : "column", gap : "10px"}}>
          <div style={{ display : 'flex', flexFlow :'row wrap' , justifyContent: 'center' , gap :'15px'}}>
            <input className='input' value={prompt} onChange={ e => setprompt(e.target.value)}></input>
            <button className='create explore' onClick={ () =>  getImages() }>Search</button>
          </div>
          
          <div style={{ display : "flex", justifyContent : 'center'}}>
                <input name='radio' className='radio' type='radio' checked={ imageEndPoint === 'unsplash'} onClick={(e) => { setImageEndPoint('unsplash')}} />
                <p style={{ color : 'rgb(16, 190, 190)'}}>Unsplash</p>
                <input name='radio' className='radio' type='radio' checked={ imageEndPoint === 'dalle'} onClick={() =>{setImageEndPoint('dalle')}} />
                <p  style={{ color : "rgb(16, 190, 190)"}}>Dalle</p>
                </div>

          
          <div style={{ display : "flex" , flexFlow : "row wrap" , padding : '5px 2px 0', gap: '5px', justifyContent : 'center' }}>
                {
                  (imageData?.length > 0 )
                  ? (
                        imageData.map( url => {
                          return (
                            <div style = {{ position : 'relative'}}>
                            <img src={url} onClick={() => setTokenUrl(url)} width="100%"></img>
                            {( tokenUrl == url ) && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display : 'flex', justifyContent : 'center', alignItems : 'center'}}> 
                              <FontAwesomeIcon size='2x' icon={faCircleCheck} style={{color: "#3fe49c"}} />
                            </div>}
                            </div>
                          )
                        } )
                    )
                  : (finding == -1 || finding == 1) ? (
                    
                   
                      <p style={{ color : 'red' , fontSize : '10pxs'}}>No Result Found</p>
                   
                  
                  )
                  : (finding == 10) ? (
                    <>
                      
                        <p style={{color : 'blueviolet'}}> Search for Logo</p>
                    
                    </>
                  )

                  : (
                    <>
                    <div className='imageLoading'>
                    <div className='imageLoading1'></div>
                    </div>
                    </>
                  )

                }
                

          </div>
          
          </div>
           
            
         </Drawer>
        </section>
     }

     {
      (currentPage === 'console')
      
      &&
      <>
      <section id='console'>
       { tokenData?.length > 0 ? <Card tokens={tokenData}  signer={signer}/> 
       : 
        <div style={{ position : 'absolute', top : '30%', left : '30%' }}>
        <p style={{ color : 'red', fontSize : '40px'}}> { !isActive ? "Connect MetaMask First !" : "No Token Found"}</p>
        </div> } 
      </section>
      </>
     }

     {
       ( currentPage == 'test') &&
      ( 
      <section id='test'>
      </section>
       )
     }
</>
  )
}

export default App

{/* <img src={Background} alt="Background image " /> */}