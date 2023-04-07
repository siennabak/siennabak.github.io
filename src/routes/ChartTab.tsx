
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
// import ApexCharts from "apexcharts";
import styled from "styled-components";
import Chart from "react-apexcharts"; 

const Loader = styled.div`
    text-align: center; 
`
interface IHistorical{
    close: string; 
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

interface ChartProps{
    coinId: string | undefined;
}
function ChartTab({coinId}:ChartProps){
    
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    
    const priceArr = data?.map((price) =>( 
        {
            x: new Date(price.time_open*1000).toLocaleDateString(),
            y: [price.open, price.high, price.low, price.close ],
        }
    )) as []


    return (
    
    <>
        {isLoading? (
            <Loader>loading...</Loader>
        ):(
            // x: new Date(1538778600000),
            // y: [6629.81, 6650.5, 6623.04, 6633.33]
            <Chart 
                type="candlestick"
                series={[
                    {data: priceArr}
                ]}
                options={{
                    chart: {
                        height: 800,
                    },
                    theme:{
                        mode: 'light'
                    },
                    grid: {
                        show: false
                    },
                    yaxis:{
                        show: false
                    },
                    xaxis:{
                       labels:{
                         show: false
                       },
                       axisTicks:{
                         show: false
                       }
                    },
                    plotOptions: {
                        candlestick: {
                            colors: {
                                upward: "#df4646", 
                                downward: "#3C90EB", 
                            },
                        },
                    },

                }}
             />
        )}
    </>
       
        
    )
}
export default ChartTab; 