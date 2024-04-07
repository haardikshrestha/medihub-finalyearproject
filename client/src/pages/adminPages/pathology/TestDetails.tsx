import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface LabTestDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  photoUrl?: string;
}

const TestDetails: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const labTestId = id ? parseInt(id) : 0;
  const [labTestDetails, setLabTestDetails] = useState<LabTestDetails>({
    id: labTestId,
    title: 'Lab Test Title',
    price: 50, 
    description: 'Description of the lab test will be displayed here.',
    photoUrl: 'test.jpg', 
  });

  const [isEdit, setIsEdit] = useState(false);

  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const handleEditClick = () => setIsEdit(!isEdit);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setLabTestDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return; 
    }

    if (!/^(image\/jpeg|image\/png|image\/gif)$/.test(selectedFile.type)) {
      console.error('Invalid image file type:', selectedFile.type);
      return; 
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (e) => {
      if (e.target?.result) {
        setTempImageUrl(e.target.result as string); 
      }
    };
  };

  return (
    <div className="container mx-auto px-8 py-4">
      {!isEdit && (
        <img
          src={labTestDetails.photoUrl || 'placeholder.jpg'}
          alt={labTestDetails.title}
          className="w-full h-auto object-cover rounded-md mb-4"
        />
      )}
      {isEdit && (
        <>
          {tempImageUrl && ( 
            <img
              src={tempImageUrl}
              alt="Selected image preview"
              className="w-full h-auto object-cover rounded-md mb-4"
            />
          )}
          <div className="flex items-center">
            <label htmlFor="image-upload" className="mr-2 text-gray-700">
              Image:
            </label>
            <input
              type="file"
              id="image-upload"
              name="photoUrl" 
              onChange={handleImageChange}
              className="px-2 py-1 border border-gray-300 rounded"
            />
          </div>
        </>
      )}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg p-4">
          {!isEdit && <h1>{labTestDetails.title}</h1>}
          {isEdit && (
            <input
              type="text"
              name="title"
              value={labTestDetails.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          )}
        </div>
        <div className="bg-white rounded-lg p-4">
          {!isEdit && (
            <p className="text-xl font-semibold mb-4">
              {`Price: $${labTestDetails.price.toFixed(2)}`}
            </p>
          )}
          {isEdit && (
            <input
              type="number"
              name="price"
              value={labTestDetails.price}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          )}
        </div>
        <div className="bg-white rounded-lg p-4">
          {!isEdit && <p className="text-lg">{labTestDetails.description}</p>}
          {isEdit && (
            <textarea
              name="description"
              value={labTestDetails.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
              rows={5}
            />
          )}
        </div>{" "}
      </div>
      <button
        onClick={handleEditClick}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
      >
        {isEdit ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default TestDetails;
