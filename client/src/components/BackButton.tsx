import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
    return(
        <button
          onClick={() => window.history.back()}
          className="mt-4  flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full hover:bg-gray-500 focus:outline-none focus:bg-gray-600"
        >
          <FaArrowLeft className="text-white" />
        </button>
    )
}

export default BackButton;