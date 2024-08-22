import {useState, useEffect} from 'react'
import axios from 'axios'
import Table from '../components/Table'
import Spinner from '../components/Spinner'

const DistilleriesInfoPage = () => {
  const [distilleryInfo, setDistilleryInfo] = useState([])
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [loading, setLoading] = useState(true)
  

  useEffect(() =>{
    const get_countries = async () =>{
      const response = await axios.get("http://34.23.26.155:5000/distilleries-info")
      setCountries(response.data.countries)
    }
    get_countries()
  }, [])

  const handleCountryChange = (e) => {
    setLoading(true)
    const country = e.target.value;
    setSelectedCountry(country)
    const get_distillery_info = async () =>{
      const response = await axios.get(`http://34.23.26.155:5000/distilleries-info/${country}`)
      setDistilleryInfo(response.data.info)
    }
    get_distillery_info() 
    setLoading(false)
  }


  return (
    
    <div>
      <h1 className="text-6xl font-bold text-slate-800 dark:text-slate-600 text-center mt-6">
          Distilleries Info Page
      </h1>

      <label 
          htmlFor="slug-select" 
          className="block text-2xl font-medium text-slate-700 dark:text-indigo-900 mb-2 text-center mt-6"
      >
          Select a Country:
      </label>
      <div className="flex justify-center">
          <select
              name="country-name"
              id="country-select"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-half p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-5"
          >
          <option value="" className="text-gray-600">Choose a Country</option>
          {countries.map((country) => (
              <option value={country} key={country} className="text-gray-700 dark:text-gray-300">
                  {country}
              </option>
          ))}
          </select>
      </div>
      {selectedCountry ? (
        loading ? (
          <Spinner loading={loading} />
        ) : (
          <Table data={distilleryInfo} type="auction" />
        )
      ) : <></>}

        {/* {selectedCountry ? <Table data={distilleryInfo} /> : <></>} */}
    </div>
  )
}

export default DistilleriesInfoPage