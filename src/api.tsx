const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins (){
    return fetch(`${BASE_URL}/coins`).then(Response => Response.json())
}

export async function fetchCoinInfo(coinId:string | undefined){
    return fetch(`${BASE_URL}/coins/${coinId}`).then(Response => Response.json())
}

export async function fetchCoinPrice(coinId:string | undefined){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(Response => Response.json())
}

export async function fetchCoinHistory(coinId:string | undefined){
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then(Response => Response.json())
}
