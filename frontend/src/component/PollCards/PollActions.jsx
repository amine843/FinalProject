import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const PollActions = ({
  isVoteComplete,
  inputCaptured,
  onVoteSubmit,
  isBookmarked,
  toggleBookmark,
  isMyPoll,
  pollClosed,
  onClosePoll,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const handleVoteClick = async () => {
    setLoading(true);
    try {
      await onVoteSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {(isVoteComplete || pollClosed) && (
        <div className="text-[11px] font-medium text-slate-600 bg-purple-700/20 px-3 py-1 rounded-md">
          {pollClosed ? "Closed" : "Voted"}
        </div>
      )}

      {isMyPoll && !pollClosed && (
        <button
          className="text-[11px] font-medium text-slate-600 bg-green-200 px-3 py-1 rounded-md hover:animate-pulse hover:bg-purple-400 hover:text-white"
          onClick={onClosePoll}
          disabled={loading}
        >
          Close
        </button>
      )}
      {isMyPoll && (
        <button
          className="text-[11px]  text-red-500 font-semibold bg-red-200 px-3 py-1 rounded-md hover:animate-pulse hover:bg-red-500 hover:text-white"
          onClick={onDelete}
          disabled={loading}
        >
          Delete
        </button>
      )}

      <button
        className="text-[20px] text-slate-300 cursor-pointer hover:text-blue-500"
        onClick={toggleBookmark}
      >
        {isBookmarked ? (
          <FaBookmark className="text-blue-800" />
        ) : (
          <FaRegBookmark />
        )}
      </button>

      {inputCaptured && !isVoteComplete && (
        <button
          className="flex items-center gap-1 text-xs font-medium text-white bg-purple-600 p-2 rounded ml-auto"
          onClick={handleVoteClick}
          disabled={loading}
        >
          {loading ? "Sending..." : "SEND"}
        </button>
      )}
    </div>
  );
};
export default PollActions;
