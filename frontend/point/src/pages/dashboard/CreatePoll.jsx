import React, { useContext, useState } from "react";
import DashboardLayout from "../../component/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import { POLL_TYPE } from "../../utils/data";
import Optioninput from "../../input/Optioninput";


const CreatePoll = () => {
  useUserAuth();


  const { user } = useContext(UserContext);
  const [pollData, setPollData] = useState({


    question: "",
    type: "",
    options: [],
    imageOptions: [],
    error: "",
  });


  const handleValueChange = (key, value) => {
    setPollData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  return (
    <DashboardLayout activeMenu="Create Poll">
      <div className="bg-gray-100/80 my-5 p-5 rounded-lg mx-auto">
        <h2 className="text-lg text-black font-medium">Create Poll</h2>
        <div className="mt-3">
          <label className="text-xs font-medium text-slate-600">Question</label>
          <textarea
            placeholder="what's in your mind"
            className="w-full h-[100px] text-[20px] font text-white outline-none bg-gradient-to-r from-pink-800 to-pink-700 p-2 rounded-md mt-2 "
            rows={4}
            value={pollData.question}
            onChange={({ target }) =>
              handleValueChange("question", target.value)
            }
          />
        </div>
        <div className="mt-3">
          <label className="text-xs font-medium text-slate-600">
            POLL TYPE
          </label>

          <div className="flex gap-4 flex-wrap mt-3 cursor-pointer">
            {POLL_TYPE.map((item) => (
              <div
                key={item.value}
                className={`option-ship ${
                  pollData.type === item.value
                    ? "text-white  font-medium px-4 py-1  rounded-lg p-1 bg-gradient-to-r from-purple-800 to-purple-700  border-purple-600  hover:cursor-pointer transition-all duration-200 "
                    : "border-sky-100"
                }`}
                onClick={() => {
                  handleValueChange("type", item.value);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {pollData.type=== "single-choise" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600">
              OPTIONS
            </label>
            <div className="mt-3">
              <Optioninput
              optionList={pollData.options}
              setOptionList={(value) => {
                handleValueChange("options", value);
              }} 
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreatePoll;
