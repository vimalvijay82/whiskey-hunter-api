import {useState, useEffect} from 'react'
import Table from '../components/Table'
import axios from 'axios'
import Spinner from '../components/Spinner'

const AuctionsDataPage = () => {
    const [auctionData, setAuctionData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const getAuctionData = async () =>{
            const response = await axios.get("http://localhost:5000/auctions-data")
            // console.log(response.data.auctions)
            setAuctionData(response.data.auctions)
          }
          getAuctionData()
          setLoading(false)
    }, [])
    
    return (
        <div>
            <h1 className="text-6xl font-bold text-slate-800 dark:text-slate-600 text-center mt-6 mb-6">
                Auctions Data Page
            </h1>
            {
                loading ? (
                    <Spinner loading={loading} />
                ) : (
                    <Table data={auctionData} type="auction"/>
                )
            }
            {/* {auctionData ? 
                (loading ? (
                    <Spinner loading={loading} />
                ) : (

                    <Table data={auctionData} type="auction"/>)
                )  : <></>} */}
        </div>
    )
}

export default AuctionsDataPage