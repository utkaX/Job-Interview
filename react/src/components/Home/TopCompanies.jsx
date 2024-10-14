import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const TopCompanies = ({ topCompanies, scroll, scrollContainerRef }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center my-8 text-blue-800 mt-20">
        Top Companies
      </h2>
      <div className="relative flex items-center">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
        >
          <FaChevronLeft />
        </button>

        {/* Company List */}
        <div
          ref={scrollContainerRef}
          className="top-companies overflow-x-auto flex space-x-4 py-4 hide-scrollbar"
          style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
        >
          {topCompanies.length > 0 ? (
            topCompanies.map((company, index) => (
              <Link
                to={`/company/${encodeURIComponent(company._id)}`}
                state={{ companyId: encodeURIComponent(company._id) }}
                key={index}
                className="flex-none bg-blue-100 px-4 py-2 rounded-lg shadow-sm text-center text-blue-700 font-semibold hover:bg-blue-200 transition"
                style={{ minWidth: "200px" }}
              >
                {company.companyName}
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No companies found.</p>
          )}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TopCompanies;
