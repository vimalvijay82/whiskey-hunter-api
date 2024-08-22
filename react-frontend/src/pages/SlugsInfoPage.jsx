import {useState, useEffect} from 'react'
import axios from 'axios'
import Table from '../components/Table'

const SlugsInfoPage = () => {

    const [slugs, setSlugs] = useState([])
    const [selectedSlug, setSelectedSlug] = useState('')
    const [slugInfo, setSlugInfo] = useState([])

    useEffect(() =>{
        const get_slugs = async () =>{
          const response = await axios.get("http://localhost:5000/slugs-info")
          setSlugs(response.data.slugs.sort())
        }
        get_slugs()
      }, [])

      const handleSlugChange = (e) => {
        const slug = e.target.value;
        setSelectedSlug(slug)
        const get_slug_info = async () =>{
          const response = await axios.get(`http://localhost:5000/slugs-info/${slug}`)
          setSlugInfo(response.data.info)
        }
        get_slug_info() 
      }

    return (
        <div>
            <h1 className="text-6xl font-bold text-slate-800 dark:text-slate-600 text-center mt-6">
                Slugs Info Page
            </h1>

            <label 
                htmlFor="slug-select" 
                className="block text-2xl font-medium text-slate-700 dark:text-indigo-900 mb-2 text-center mt-6"
            >
                Select a Slug:
            </label>

            <div className="flex justify-center">
                <select
                    name="slug-name"
                    id="slug-select"
                    value={selectedSlug}
                    onChange={handleSlugChange}
                    className="w-half p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-5"
                >
                <option value="" className="text-gray-600">Choose a Slug</option>
                {slugs.map((slug) => (
                    <option value={slug} key={slug} className="text-gray-700 dark:text-gray-300">
                        {slug}
                    </option>
                ))}
                </select>
            </div>
                {selectedSlug ? <Table data={slugInfo} /> : <></>}
        </div>
    )
}

export default SlugsInfoPage