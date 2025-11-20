import React from 'react'

const TreadingPolls = ({stats}) => {
  return (
    <div className='bg-gray-800 rounded-lg mt-6 overflow-hidden sticky top-[80px] p-5  '>
        <h6 className='text-sm text-white font-medium'>Trending</h6>
        <div className='mt-4 '>
            {stats.map((item) => (
                <div className='bg-white flex items-center justify-between rounded-lg cursor-pointer mb-1 px-3 py-2 hover:bg-red-400  '>
                    <p className='text-xs text-pink-900'>{item.label}</p>
                    <span className='text-xs text-white bg-gray-700 [border-radius:59%_41%_46%_54%_/_58%_50%_50%_42%] py-[2px] px-4'> {item.count} </span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TreadingPolls