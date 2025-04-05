import { FaSearch, FaCaretDown, FaMapMarkerAlt } from "react-icons/fa";

const SearchBar = ({ searchJob, setSearchJob, experienceYears, setExperienceYears, searchLocation, setSearchLocation, handleSearch, error }) => {
  return (
    <div className={`rounded-full mb-0 flex items-center justify-between border shadow-md p-2 w-full sm:w-2/3 mx-auto ${error ? "border-red-500" : "border-gray-300"}`}>
      <div className="relative flex-grow mx-2">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaSearch />
        </div>
        <input
          type="text"
          value={searchJob}
          onChange={(e) => setSearchJob(e.target.value)}
          className={`pl-10 p-3 w-full text-gray-700 focus:outline-none ${error ? "border-red-500" : ""}`}
          placeholder="Enter Skills/Designation/Companies"
        />
      </div>

      <span className="text-gray-400">|</span>

      <div className="relative flex-grow mx-2">
        <select
          value={experienceYears}
          onChange={(e) => setExperienceYears(e.target.value)}
          className="p-3 w-full text-gray-700 focus:outline-none appearance-none"
        >
          <option value="">Select Experience</option>
          {["Freshers", "1 year", "2 years", "3 years", "4 years", "5 years"].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
          <FaCaretDown />
        </div>
      </div>

      <span className="text-gray-400">|</span>

      <div className="relative flex-grow mx-2">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaMapMarkerAlt />
        </div>
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-3 pl-10 w-full text-gray-700 focus:outline-none"
          placeholder="Location"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 px-4 ml-2 flex items-center"
      >
        <FaSearch className="mr-2" />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
