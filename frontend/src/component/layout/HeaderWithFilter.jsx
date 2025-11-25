import React, { useState } from "react";
import { POLL_TYPE } from "../../utils/data";
import { IoCloseOutline } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";

const HeaderWithFilter = ({ title, filterType, setFilterType }) => {
  const [open, setOpen] = useState(false);

  return (
<div>
      <div className=" ">
        <div>
        <h2 className="sm:text-xl font-medium flex justify-center text-black"> {title} </h2>
      </div>
    <div className="">
        <button
          className={`flex items-center justify-center gap-3 text-sm text-white bg-purple-700 px-4 py-2
        ${open ? "rounded-t-lg" : "rounded-lg"}
        `}
          onClick={() => {
            if (filterType !== "") setFilterType("");
            setOpen(!open);
          }}
        >
          {filterType !== "" ? (
            <>
              <IoCloseOutline className="text-lg" />
              Clear
            </>
          ) : (
            <>
              <IoFilterOutline className="text-lg" />
              Filter
            </>
          )}
        </button>
    </div>
</div>


      {open && (
        <div className="flex flex-wrap justify-center gap-4 bg-purple-700 py-4 rounded-b-lg">
            {[{label: "All", value: ""}, ...POLL_TYPE].map((type)=>(
                <button
                key={type.value}
                className={`text-[12px] px-4 py-1 rounded-lg text-nowrap ${
                    filterType == type.value
                    ? "text-white bg-sky-900"
                    : "text-[13px] bg-sky-100"
                }`}
                onClick={()=> {
                    setFilterType(type.value);
                }}
                >
                {type.label}
                </button>
            ))}
         </div>
      )}
    </div>
  );
};
export default HeaderWithFilter;
