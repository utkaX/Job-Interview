import { FaSearch, FaCaretDown, FaMapMarkerAlt } from "react-icons/fa";

const SearchBar = ({ 
  searchJob, 
  setSearchJob,
  experienceYears,
  setExperienceYears,
  searchLocation,
  setSearchLocation,
  handleSearch,
  error 
}) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchJob}
            onChange={(e) => setSearchJob(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex-1">
          <input
            type="text"
            placeholder="Location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Experience (years)..."
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSearch}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SearchBar;
