import { useState } from 'react'
import  {   Active } from'./active.jsx';
import  {   InActive } from'./inactive.jsx';
import './inactive.jsx'
import { getCurrentChainName } from './changeChain.js'

export default function MetaMask({provider, setaccount, setSigner, setchainName}){

     function connect(){
        if ( !isActive){
            
            provider.send('eth_requestAccounts', [])
            .then( (accounts) => {
                
                setaccount(accounts[0]);
                setSigner(provider.getSigner());

            })
            .catch ( error => console.log(error))
            setisActive(true);

            getCurrentChainName()
            .then( name =>{console.log(name); setchainName(name)})
            .catch(error => { console.log( error )}) ;
            
        }

    }

    const [isActive, setisActive] = useState(false);

    return (
        <>
            <button style={{ border: "none", backgroundColor: "transparent", color: "inherit", font: "inherit", cursor: "pointer", outline: "none", marginTop : '15px'}} onClick={ () => connect()}>
                { (isActive) ? ( <Active />) : ( <InActive/> ) }
            </button>
        </>
    )
}