import { useNavigate } from 'react-router-dom';

const CreateDoctor = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ind');
  };

  return (
    <>
      <button
        className="block text-white bg-lime-500 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
        onClick={handleClick}
      >
        Add Doctor
      </button>
    </>
  );
};

export default CreateDoctor;