import React from 'react';

const PermissionsPending = ({ room, roomcode, door, branch, intime, outtime, date }) => {


  return (
    <div>
      <div className="bg-yellow-50 shadow rounded-lg pt-3 pb-3 pl-5 pr-5  ">
          <div>
            <div className='flex justify-between items-center mb-4 '>
            <h2 className="text-lg font-semibold">{room}</h2>
            <span className='text-black-500'>{roomcode}</span>
            </div>
            <div className='flex justify-between items-center mb-1 '>
            <p className="text-base">Door</p>
            <span className='text-gray-500'>{door}</span>
            </div>
            <div className='flex justify-between items-center mb-1 '>
            <p className="text-base">Branch</p>
            <span className='text-gray-500'>{branch}</span>
            </div>
            <div className='flex justify-between items-center mb-1 '>
            <p className="text-base">In Time</p>
            <span className='text-gray-500'>{intime}</span>
            </div>
            <div className='flex justify-between items-center mb-1 '>
            <p className="text-base">Out Time</p>
            <span className='text-gray-500'>{outtime}</span>
            </div>
            <div className='flex justify-between items-center mb-1 '>
            <p className="text-base">Date</p>
            <span className='text-gray-500'>{date}</span>
            </div>
         
            
          </div>
        </div>
    </div>
  )
}

export default PermissionsPending







