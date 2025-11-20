import React from "react";
import { HiPlus } from "react-icons/hi";
import { IoTrashSharp } from "react-icons/io5";

const OptionImageSelector = ({ imageList, setImageList }) => {
  // function to handle adding an image
  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file && imageList.length < 4) {
      const reader = new FileReader();
      reader.onload = () => {
        // add object with base64 and file to the array
        setImageList([...imageList, { base64: reader.result, file }]);
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  // function to handle deleting an image
  const handleDeleteImage = (index) => {
    const updatedList= imageList.filter((_, idx) => idx !== index);
    setImageList(updatedList);
  };

  return (
    <div>
      {imageList?.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {imageList.map((item, index) => (
            <div className="flex justify-center  border border-blue-700 animate-border-bounce  rounded-md relative">
              <img
              src={item.base64}
              alt={`Selected_${index}`}
               className=" h-36 object-contain rounded-md" />

              <button
                onClick={() => handleDeleteImage(index)}
                className="text-red-500 bg-gray-100 rounded-full p-2 absolute top-2 right-2"
              >
                <IoTrashSharp className="text-xl text-gray-400 hover:scale-100 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {imageList.length < 4 && (
        <div className="flex items-center gap-5">
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleAddImage}
            className="hidden"
            id="imageInput"
          />

          <label
            htmlFor="imageInput" 
            className=" text-nowrap flex items-center gap-1 text-xs font-medium bg-gradient-to-r animate-bounce from-purple-900 to-purple-700 text-white rounded px-3 py-[7px]"
          >
            <HiPlus className="text-lg "/>
            Select Image
            </label>
        </div>
      )}
    </div>
  );
};

export default OptionImageSelector;
