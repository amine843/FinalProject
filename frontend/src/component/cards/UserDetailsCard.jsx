import React from "react"
const StatsInfo = ({ label, value}) => {
    return (
        <div className="text-center">
            <p className="font-medium text-black"> {value}</p>
            <p className="text-xs text-black mt-[2px] "> {label} </p>
        </div>
    );
};

const UserDetailsCard = ({
    profileImageUrl,
        fullName,
        username,
        totalPollsVotes,
        totalPollsCreated,
        totalPollsBookmarked,
}) => {
    return ( 
    <div className=' rounded-lg mt-16 overflow-hidden'>
        <div className='w-full h-32 bg-[url(././)] [border-radius:59%_41%_46%_54%_/_58%_50%_50%_42%] bg-cover flex justify-center relative'>
            <div className='absolute -bottom-10 rounded-full overflow-hidden border-2 border-purple-400'>
                <img 
                src={profileImageUrl || "" }
                 alt="Profile Image"
                 className = "w-20 h-20 bg-slate-400 rounded-full object-cover object-top  "
                  />
                  </div>
                  </div>

                  <div className='mt-12 px-5'>
                    <div className='flex flex-col justify-center items-center text-center pt-5'>
                        <h5 className='text-lg text-black bg-gray-200 w-14 rounded font-medium leading-6'>
                            {fullName}
                        </h5>
                        <span className='text-[13px] font-medium text-black'>
                       <br /> @{username}
                        </span>
                    </div>
                    <div className='flex  items-center justify-center gap-5  my-6'>
                        <StatsInfo label="Polls Created" value={totalPollsCreated || 0 }/>
                        <StatsInfo label="Polls Voted" value={totalPollsVotes || 0 } />
                        <StatsInfo label="Polls Bookmarked" value={totalPollsBookmarked || 0 } />

                    </div>
                    </div>
                    </div>
                    );
                };

export default UserDetailsCard;