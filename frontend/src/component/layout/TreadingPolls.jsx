import React from 'react'

const TreadingPolls = ({stats}) => {
  return (
    <div className='bg-white rounded-lg mt-6 overflow-hidden sticky top-[80px] p-5  '>
        <h6 className='text-sm text-white bg-purple-300 w-16 p-1 rounded'>Trending</h6>
        <div className='mt-4 '>
            {stats.map((item) => (
                <div className='text-purple-800 hover:text-white  bg-purple-200 flex items-center justify-between rounded-lg cursor-pointer mb-1 px-3 py-2 hover:bg-purple-800 '>
                    <p className='text-xs'>{item.label}</p>
                    <span className='text-xs [border-radius:59%_41%_46%_54%_/_58%_50%_50%_42%] py-[2px] px-4'> {item.count} </span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TreadingPolls