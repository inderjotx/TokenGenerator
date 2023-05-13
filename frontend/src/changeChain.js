export  async function changeChain(id){

    if ( window.ethereum){
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: id }],
        });

    }
    else{
        console.log("Install MetaMask")
    }
}


export  async function getCurrentChain(){
    console.log("insider get current chain")
    if (window.ethereum) {
        
        window.ethereum.request({ method: 'eth_chainId' })
          .then(networkId => {
            console.log(networkId);
            return networkId;
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error('Please install MetaMask.');
}
}

export async function getCurrentChainName(){
      const ID  = 
       {
        mainnet: "0x1",
        goerli: "0x5",
        polygon: "0x89",
        sepolia : "0xaa36a7",
        mumbai : "0x13881"
       }

    return new Promise ( 
      ( resolve, reject ) => {

        if (window.ethereum) {
            
            window.ethereum.request({ method: 'eth_chainId' })
              .then(networkId => {
                const answer = Object.keys(ID).find( (key) => ID[key] == networkId );
                console.log(answer);
                resolve(answer);
                
              })
              .catch(error => {
                console.error(error);
                reject( error );
              });
          } else {
            console.error('Please install MetaMask.');
            reject( new Error("Please install MetaMask"));
          }

      }
    )

    


}