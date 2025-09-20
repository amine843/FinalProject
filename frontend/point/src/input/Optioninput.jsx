import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { IoTrashSharp } from "react-icons/io5";

const Optioninput = ({ optionList, setOptionList }) => {
  const [option, setOption] = useState("");

  // function to handle adding  an option
  const handleAddOption = () => {
    if (option.trim() && optionList.length < 4) {
      setOptionList([...optionList, option.trim()]);
      setOption("");
    }
  };

  // function to handle deleting an option
  const handleDeleteOption = (index) => {
    const updateArr = optionList.filter((_, idx) => idx !== index);
    setOptionList(updateArr)
  };

  return (
    <div>
      {optionList.map((item, index) => (
        <div
          key={item}
          className="m-1 flex justify-between bg-purple-200/80 px-2 py-2 rounded"
        >
          <p className="text-xs font-medium text-black">{item}</p>

          <button
            onClick={() => {
              handleDeleteOption(index);
            }}
          >
           <IoTrashSharp className="text-xl text-gray-500 hover:scale-150 hover:text-red-500" />
          </button>
        </div>
      ))}

      {optionList.length < 4 && (
        <div className="flex items-center gap-5 mt-4 ">
          <input
            type="text"
            placeholder="Enter Option "
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-gray-200/880 px-3 py-[6px] rounded-md "
          />

          <button
            className=" text-nowrap flex items-center gap-1 text-xs font-medium bg-gradient-to-r from-purple-600 to-purple-300 text-white hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-pink-600 rounded px-3 py-[7px] "
            onClick={handleAddOption}
          >
            <HiPlus className="text-lg" /> add Option
          </button>
        </div>
      )}
    </div>
  );
};

export default Optioninput;
