
const Search = () => {
  return (
    <div className="flex items-center flex-grow mx-80">
    <input
      type="text"
      placeholder="Search..."
      className="px-4 py-2 flex-grow rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500 w-96"  // Set a fixed width for the search bar
    />
    <button
      type="button"
      className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
    >
      Search
    </button>
  </div>

 
  )
}

export default Search