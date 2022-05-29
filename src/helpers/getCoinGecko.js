
const inicializacion = () => {
    
    //1. Import coingecko-api
    const CoinGecko = require('coingecko-api');

    //2. Initiate the CoinGecko API Client
    const CoinGeckoClient = new CoinGecko();

    return CoinGeckoClient
}


//3. Make calls
export const pingCall = async() => {
  
  const CoinGeckoClient = inicializacion()
  let ping = await CoinGeckoClient.ping()
  //console.log(ping)

  if(ping.success = true){
      console.log("Servidor  disponible")
  }else{
      console.log("Servidor no disponiple")
  }
  
};

export const bitcoinCall = async() => {
    const CoinGeckoClient = inicializacion()
    let {data} = await CoinGeckoClient.coins.fetch('bitcoin', {})
    console.log("bitcoinCall: ", data)
    return data;
}

export const ethereumCall = async() => {
    const CoinGeckoClient = inicializacion()
    let {data} = await CoinGeckoClient.coins.fetch('ethereum', {})
    console.log("ethereumCall: ", data)
    return data;
}


