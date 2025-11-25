import React, { useContext, useState } from "react";
import DashboardLayout from "../../component/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import { POLL_TYPE } from "../../utils/data";
import Optioninput from "../../input/Optioninput";
import OptionImageSelector from "../../input/OptionImageSelector";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const CreatePoll = () => {
  useUserAuth();

  const { user, onPollCreateOrDelete } = useContext(UserContext);
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

  // Clear Data
  const clearData = () => {
    setPollData({
      question: "",
      type: "",
      options: [],
      imageOptions: [],
      error: "",
    });
  };

  // upload image and get image urls

  const updateImageAndGetLink = async (imageOptions) => {
    const optionPromises = imageOptions.map(async (imageOption) => {
      try {
        const imgUploadRes = await uploadImage(imageOption.file);
        return imgUploadRes.imageUrl || "";
      } catch (error) {
        console.error(`error uploading image :${imageOption.file.name}`);
        return "";
      }
    });

    const optionArr = await Promise.all(optionPromises);
    return optionArr;
  };

  const getOptions = async () => {
    switch (pollData.type) {
      case "single-choice":
        return pollData.options;
      case "image-based":
        const imageUrls = await updateImageAndGetLink(pollData.imageOptions);
        return imageUrls;
      case "rating":
        return [1, 2, 3, 4, 5];
      default:
        return [];
    }
  };

  // Create a New Poll

  const handleCreatePoll = async () => {
    const { question, type, options, error, imageOptions } = pollData;

    if (!question || !type) {
      console.log("CREATE", { question, type, options, error });
      handleValueChange("error", "Questions & Type are required");
      return;
    }

    if (type === "single-choice" && options.length < 2) {
      handleValueChange("error", "Enter at two options");
      return;
    }
    if (type === "image-based" && imageOptions.length < 2) {
      handleValueChange("error", "Enter at two options");
      return;
    }
    handleValueChange("error", "");
    console.log("NO_ERR", { pollData });

    const optionData = await getOptions();

    try {
      const response = await axiosInstance.post(API_PATHS.POLLS.CREATE, {
        question,
        type,
        options: optionData,
        creatorId: user._id,
      });
      if (response) {
        toast.success("Poll Created Successfully!");
        onPollCreateOrDelete();
        clearData();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        handleValueChange("error", error.response.data.message);
      } else {
      }
    }
  };

  return (
    <DashboardLayout activeMenu="Create Poll">
      <div className="bg-gray-100/80 my-5 p-5 rounded-lg mx-auto">
        <h2 className="text-lg text-black font-medium">Create Poll</h2>
        <div className="mt-3">
          <label className="text-xs font-medium text-slate-600">Question</label>
          <textarea
            placeholder="what's in your mind"
            className="w-full h-[100px] text-[20px] font- text-purple-700 outline-none bg-gradient-to-r from-purple-200 to-purple-600 p-2 rounded-md mt-2 shadow-2xl "
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
                    ? "text-white  font-medium px-4 py-1  rounded-lg p-1 bg-gradient-to-r from-purple-800 to-purple-700  border-purple-600  hover:cursor-pointer transition-all duration-200 "                    : "border-sky-100"
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

        {pollData.type === "single-choice" && (
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

        {pollData.type === "image-based" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600">
              IMAGE OPTIONS
            </label>

            <div className="mt-3">
              <OptionImageSelector
                imageList={pollData.imageOptions}
                setImageList={(value) => {
                  handleValueChange("imageOptions", value);
                }}
              />
            </div>
          </div>
        )}

        {pollData.type === "rating" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600">
              This poll will have options: 1, 2, 3, 4, 5
            </label>
          </div>
        )}

        {pollData.error && (
          <p className="test-xs font-medium text-red-500 mt-5">
            {pollData.error}
          </p>
        )}
        <button
          className="text-white mt-6 font-medium px-4 py-1  rounded-lg p-1 bg-gradient-to-r from-purple-800 to-purple-700  border-purple-600  hover:cursor-pointer transition-all duration-200"
          onClick={handleCreatePoll}
        >
          Create
        </button>
      </div>
    </DashboardLayout>
  );
};

export default CreatePoll;
