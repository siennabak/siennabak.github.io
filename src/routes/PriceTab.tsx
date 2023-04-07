import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinPrice } from "../api";

const Loader = styled.div`
    text-align: center; 
` 
const Update = styled.div`
    text-align: right; 
    color: #666666; 
    font-size: 12px;
    margin-bottom: 30px;
`
const Line = styled.div`
    font-size: 15px;
    margin-bottom: 12px; 
    display: flex; 
`
const Noti = styled.div`
    font-size: 14px; 
    margin-bottom: 20px;
    color: #666666; 
`
const Key = styled.b`
    margin-right: 10px; 
    font-weight: bold;
    flex: 3;
`
const Value = styled.span`
   flex: 4;
`
interface IpriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD:{
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_15m: number;
            percent_change_30m: number;
            percent_change_1h: number;
            percent_change_6h: number;
            percent_change_12h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            percent_change_30d: number;
            percent_change_1y: number;
            ath_price: number;
            ath_date: string;
            percent_from_price_ath: number;
        }
    }
}
interface PriceProps{
    coinId: string | undefined;
}
function PriceTab({coinId}: PriceProps){
    const {isLoading, data} = useQuery<IpriceData>(["tickers", coinId], () => fetchCoinPrice(coinId))
    console.log(data)
    return(
        <>
        {isLoading? (
                <Loader>loading...</Loader>
            ):(
                <div>
                    <Update>Last Update: {data?.last_updated.substring(0,10)}</Update>
                    
                    <Noti>화폐: USD</Noti>
                    <Line>
                        <Key>가격:</Key>
                        <Value>${data?.quotes.USD.price}</Value>
                    </Line>
                    <Line>
                        <Key>최대 발행량:</Key>
                        <Value>{data?.max_supply}</Value>
                    </Line>
                    
                    <Line>
                        <Key>거래량(24시간 기준):</Key>
                        <Value>${data?.quotes.USD.volume_24h}</Value>
                    </Line>
                    <Line>
                        <Key>시가총액:</Key>
                        <Value>${data?.quotes.USD.market_cap}</Value>
                    </Line>
                </div>
               
            )
        }
        </>
    )
}

export default PriceTab;