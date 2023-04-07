import { Link } from "react-router-dom";
import styled from "styled-components";
import {AiOutlineSwapRight} from "react-icons/ai"
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
    padding: 80px 20px;
    min-height: 100vh; 
    background: ${props => props.theme.backgroundColor};
    color: ${(props)=> props.theme.textColor};
`
const Title = styled.h1`
    font-size: 2.75em;
    font-weight: 800;
    display: block; 
    text-align: center; 
    margin-bottom: 50px; 
    color: ${(props)=> props.theme.titleColor};
`
const CoinList = styled.div`
    width: 100%;
    max-width: 340px; 
    margin: 0 auto; 
`
const Coin = styled.div`
    width: 100%; 
    border-radius: 15px;
    background: ${(props)=> props.theme.boxColor};
    margin-bottom: 10px; 
`
const CoinLink = styled(Link)`

    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    color: ${(props)=> props.theme.textColor};
    text-decoration: none; 
    padding: 15px 25px; 
    transition: .15s;
    &:hover{
        color: #3dd065;
    }
`
const CoinName = styled.div`
    display: flex; 
    align-items: center; 
`
const CoinIcon = styled.img`
    width: 30px; 
    margin-right: 15px;
`
const Loader = styled.div`
    text-align: center; 
`


interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
    
}
function Coins(){
    const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Title>Coins</Title>
            {isLoading ? (<Loader>loading...</Loader>): (<CoinList>
                {data?.slice(0,100).map( (coin) => 
                    <Coin key={coin.id}>
                        <CoinLink to={`/${coin.id}`} state={coin.id.toLocaleLowerCase() }>
                            <CoinName>
                                <CoinIcon src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                                {coin.name}
                            </CoinName>
                            <AiOutlineSwapRight size="20"/>
                        </CoinLink>
                        
                    </Coin>
                )}
            </CoinList>)}
        </Container>

    )
}

export default Coins;