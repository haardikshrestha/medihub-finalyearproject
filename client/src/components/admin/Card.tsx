interface CardProps {
  number: string;
  title: string;
  imageUrl: string; 
}

const Card: React.FC<CardProps> = ({ number, title, imageUrl }) => {
  return (
    <div className="flex items-center justify-center w-2/12 p-6 bg-white rounded-lg">
      <div className="text-center">
      <img
            src={imageUrl}
            alt="Icon"
            className="inline-block mr-2 mb-4"
            style={{ width: '50px', height: '50px' }} // Adjust the size as needed
          />
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        
          {number}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export default Card;
