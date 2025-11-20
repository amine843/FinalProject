import React, { useEffect, useState } from "react";
import DashboardLayout from "../../component/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import PollCard from "../../component/PollCards/PollCard";
import { useNavigate } from "react-router-dom";
import CREATE_ICON from "/trrt.jpg";
import EmptyCard from "../../component/cards/EmptyCard";


const VotedPolls = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [votedPolls, setVotedPolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.POLLS.VOTED_POLLS);

      if (response.data?.polls?.length > 0) {
        setVotedPolls((prevPolls) => [...prevPolls, ...response.data.polls]);
      }
    } catch (error) {
      console.log("Something went wrong. please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPolls();
    return(() => {});
   }, []);

  return (
    <DashboardLayout activeMenu="Voted Polls">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black"> Voted Polls</h2>

        {votedPolls.length === 0 && !loading && (
          <EmptyCard
            imgSrc={CREATE_ICON}
            message="you have not voted on any polls ye! start exploring and voting on polls now!"
            btnText="explore"
            onClick={() => navigate("/dashboard")}
          />
        )}

        {votedPolls.map((poll) => (
          <PollCard
            key={`dashboard_${poll._id}`}
            pollId={poll._id}
            question={poll.question}
            type={poll.type}
            options={poll.options}
            voters={poll.voters.length || 0}
            responses={poll.responses || {}}
            creatorProfileImg={poll.creator.profileImageUrl || null}
            creatorName={poll.creator.fullname}
            creatorUsername={poll.creator.username}
            userHasVoted={poll.userHasVoted || false}
            isPollClosed={poll.closed || false}
            createdAt={poll.createdAt || false}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};
export default VotedPolls;
