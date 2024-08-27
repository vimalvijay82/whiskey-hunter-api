import {useState, useEffect} from 'react'

const Table = ({data}, {type="default"}) => {
    const [keys, setKeys] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' })
    const itemsPerPage = 20
    const [pageNumbers, setPageNumbers] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
      }
      
      const sortedItems = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      

      useEffect(() => {
        if (data && data.length > 0) {
          setKeys(Object.keys(data[0]));
        }
        
      }, [data]);

      const filteredItems = sortedItems.filter(item => 
        keys.some(key => 
            item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );


      const indexOfLastItem = currentPage * itemsPerPage
      const indexOfFirstItem = indexOfLastItem - itemsPerPage
      const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
      const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
      
    
      const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
      };

      const getPageNumbers = () => {
        const pageNumbers = [];
        pageNumbers.push(1);
        if ((currentPage - 1) > 2) {
            pageNumbers.push('...')
        }
        if ((currentPage - 1) > 1){
            pageNumbers.push(currentPage - 1)
        }
        if(currentPage != 1 && currentPage!=totalPages) {
        pageNumbers.push(currentPage)}

        if(currentPage + 1 < totalPages){
            pageNumbers.push(currentPage + 1)
        }
        if(currentPage + 2 < totalPages){
            pageNumbers.push('...')
        }
        if (totalPages > 1) {
          pageNumbers.push(totalPages);
        }
        return pageNumbers
      };

    return (
        <div className="max-w-8xl mx-auto p-8">
          <div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                      <div className="mb-4">
                          <input
                              type="text"
                              placeholder="Search..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    {keys.map((key)=>(
                                      <th key={key} scope="col" 
                                        onClick={() => handleSort(key)}
                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                                      {key.replace(/_/g, ' ').toUpperCase()}
                                      </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {currentItems.map((info, index)=>(
                                  <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700"> 
                                    {keys.map((key)=>(
                                      <td key={`${index}-${key}`} className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{info[key]}</td>
                                    ))}
                                  </tr>
                                ))}
                            </tbody>
                        </table>
                      </div>
                  </div>
              </div>
          </div>
          <div className="flex justify-center mt-4">
            {console.log(getPageNumbers())}
            {getPageNumbers().map((page, index)=>
                page=== '...' ? (
                    <span key={`ellipsis-${index}-${currentPage}`} className="px-4 py-2 mx-1">
                        {page}
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`px-4 py-2 mx-1 ${
                        currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        } rounded`}
                    >
                {page}
              </button>
                ) 
            )}
          </div>
        </div>
    )
}

export default Table