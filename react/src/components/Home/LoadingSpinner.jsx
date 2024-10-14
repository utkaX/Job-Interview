import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="text-center py-10 flex flex-col items-center">
      <FaSpinner className="animate-spin text-gray-500 mb-2" size={24} />
      <p className="text-gray-500">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
