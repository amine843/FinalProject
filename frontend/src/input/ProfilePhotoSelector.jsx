import React, { useRef, useState } from "react";
import { User, Upload, Trash } from "lucide-react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handRemoveChange = () => {
    setImage(null);
    setPreviewUrl(null);
    inputRef.current.value = null;
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-sky-100 rounded-full relative">
          <User className="text-4xl text-blue-400" />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center text-white bg-blue-400 rounded-full absolute -bottom-1 -right-1"
            onClick={onChooseFile}
          >
            <Upload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile Photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center text-white bg-red-400 rounded-full absolute -bottom-1 -right-1"
            onClick={handRemoveChange}
          >
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
