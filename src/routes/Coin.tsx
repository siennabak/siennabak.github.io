import { Link, useLocation, useParams, Route, Routes, useMatch } from "react-router-dom";
import styled from "styled-components";
import {AiOutlineHome} from "react-icons/ai"
import Price from "./PriceTab";
import ChartTab from "./ChartTab";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { Helmet } from "react-helmet-async";
import PriceTab from "./PriceTab";



interface IinfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    logo: string;
    description: string;
    open_source: boolean;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

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


const Container = styled.div`
    padding: 80px 20px;
    min-height: 100vh; 
    background: ${props => props.theme.backgroundColor};
    color: ${(props)=> props.theme.textColor};
`
const TitleBox = styled.div`
    width: 100%; 
    max-width: 340px;
    position: relative; 
    margin: 0 auto;
`
const HomeButton = styled(Link)`
    position: absolute; 
    right: 0; top: -45px; 
    width: 36px; 
    height: 36px; 
    border-radius: 50%;
    background: #3dd065;
    display: flex; 
    justify-content: center; 
    align-items: center; 
`
const Title = styled.h1`
    font-size: 2.75em;
    font-weight: 800;
    display: block; 
    text-align: center; 
    text-transform: uppercase; 
    margin-bottom: 50px; 
    color: ${(props)=> props.theme.titleColor};
`
const CoinDetail = styled.div`
    width: 100%;
    max-width: 340px; 
    margin: 0 auto; 
`

const Box = styled.div`
    padding: 25px 20px; 
    background: ${(props)=> props.theme.boxColor};
    border-radius: 15px; 
    margin-bottom:15px; 
    display: flex; 
    justify-content: space-between; 
`

const BoxItem = styled.span`
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center;
`
const Key = styled.span`
    font-size: 11px;
    margin-bottom: 5px;
`
const Value = styled.span``

const Desc = styled.p`
    line-height: 1.4;
    padding-top: 10px; 
`

const Loader = styled.div`
    text-align: center; 
`
const TabBtns = styled.div`
    margin: 20px -5px;
    display: flex; 
`
const TabBtn = styled.span<{isMatch: boolean}>`
    flex: 1; 
    margin: 0 5px; 
    text-align: center; 
    border-radius: 10px; 
    background: ${props => props.isMatch? props.theme.pointColor:props.theme.boxColor}; 
`
const TabLink = styled(Link)`
    display: block;
    width: 100%; 
    height: 100%;
    padding: 12px 20px;  

`
function Coin(){
  
    const {coinId} = useParams();
    const {state} = useLocation();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    const {isLoading: infoLoading, data: infoData} = useQuery<IinfoData>(["info", coinId], () => fetchCoinInfo(coinId))
    const {isLoading: tickerLoading, data: tickerData} = useQuery<IpriceData>(["tickers", coinId], () => fetchCoinPrice(coinId))
    
    const loading = infoLoading || tickerLoading;
    
    return (
        <Container>
            <Helmet>
                <title>{ state? (`${state}`): loading? 'loading...':(`${coinId}`)}</title>
            </Helmet>
            <TitleBox>
                <HomeButton to='/'><AiOutlineHome size="18"/></HomeButton>
                <Title>{ state? (`${state}`): loading? 'loading...':(`${coinId}`)}</Title>
            </TitleBox>
        
        {loading ? (<Loader>loading...</Loader>): (
        <CoinDetail>
           <Box>
                <BoxItem>
                    <Key>RANK</Key>
                    <Value>{infoData?.rank}</Value>
                </BoxItem>
                <BoxItem>
                    <Key>SYMBOL</Key>
                    <Value>${infoData?.symbol}</Value>
                </BoxItem>
                <BoxItem>
                    <Key>OPEN SOURCE</Key>
                    <Value>{infoData?.open_source? `Yes`: `No`}</Value>
                </BoxItem>
            </Box>
            <Box>
                <BoxItem>
                    <Key>TOTAL SUPLY</Key>
                    <Value>{tickerData?.total_supply}</Value>
                </BoxItem>
                <BoxItem>
                    <Key>MAX SUPLY</Key>
                    <Value>${tickerData?.max_supply}</Value>
                </BoxItem>
           </Box>
           <Desc>{infoData?.description}</Desc>
        </CoinDetail>)}
        <CoinDetail>
            <TabBtns>
            <TabBtn isMatch={priceMatch !== null}><TabLink to={`/${coinId}/price`}>Price</TabLink></TabBtn>
            <TabBtn isMatch={chartMatch !== null}><TabLink to={`/${coinId}/chart`}>Chart</TabLink></TabBtn>
            </TabBtns>
            <Routes>
                <Route path={`price`} element={<PriceTab coinId={coinId}/>} />
                <Route path={`chart`} element={<ChartTab coinId={coinId}/>} />
            </Routes>
        </CoinDetail>
    </Container>
    )
}

export default Coin;