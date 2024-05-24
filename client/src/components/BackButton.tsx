import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center justify-center ml-8 p-2 rounded-full bg-gradient-to-r from-[#91BF77] to-[#7da466] hover:bg-gradient-to-l hover:from-[#7da466] hover:to-[#91BF77] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#91BF77]"
    > 
      <FaArrowLeft className="text-white h-5 w-5" />
    </button>
  );
};

export default BackButton;