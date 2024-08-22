import {useState, useEffect} from 'react'
import Table from '../components/Table'
import axios from 'axios'
import Spinner from '../components/Spinner'

const AuctionsInfoPage = () => {
    const [auctionInfo, setAuctionInfo] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const getAuctionInfo = async () =>{
            const response = await axios.get("http://34.23.26.155:5000/auctions-info")
            // console.log(response.data.auctions)
            setAuctionInfo(response.data.auctions)
          }
          getAuctionInfo()
          setLoading(false)
    }, [])
    
    return (
        <div>
            <h1 className="text-6xl font-bold text-slate-800 dark:text-slate-600 text-center mt-6 mb-6">
                Auctions Info Page
            </h1>
            {
                loading ? (
                    <Spinner loading={loading} />
                ) : (
                    <Table data={auctionInfo} type="auction"/>
                )
            }
        </div>
    )
}

export default AuctionsInfoPage