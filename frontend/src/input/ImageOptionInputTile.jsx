import React from "react";

const ImageOptionInputTile = ({isSelected, imgUrl, onSelect}) => {
  const getColors = () => {
    if (isSelected) return "border-2 border-blue-400";
    return "border-transparent";
  };
  return (
    <button
      className={`w-full max-w-sm h-[500px] flex items-center justify-center  gap-2 bg-slate-200/40 mb-4 border rounded-md overflow-hidden  ${getColors()}`}
      onClick={onSelect}
    >
      <img src={imgUrl} alt="" className=" w-full h-full object-cover rounded-lg  " />
    </button>
  );
};

export default ImageOptionInputTile;
