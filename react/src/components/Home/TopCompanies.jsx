import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const TopCompanies = ({ topCompanies, scroll, scrollContainerRef }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 px-4">Top Companies</h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory hide-scrollbar"
        >
          {topCompanies.map((company) => (
            <div
              key={company._id}
              className="flex-none w-64 md:w-72 snap-center"
            >
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={company.logo || "default-company-logo.png"}
                  alt={company.companyName}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{company.companyName}</h3>
                <p className="text-gray-600 text-sm mb-2">{company.industry}</p>
                <p className="text-gray-500 text-sm">{company.location}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
        >
          ←
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default TopCompanies;
