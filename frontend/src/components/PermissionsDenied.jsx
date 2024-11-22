import React from 'react';

const PermissionsDenied = ({ room, roomcode, door, branch, entryTime, exitTime, date, message }) => {


  return (
    <div>
      <div className="bg-red-50 shadow rounded-lg pt-3 pb-3 pl-5 pr-5  ">
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
            <span className='text-gray-500'>{entryTime}</span>
            </div>
            <div className='flex justify-between items-center mb-1 '>
            <p className="text-base">Out Time</p>
            <span className='text-gray-500'>{exitTime}</span>
            </div>
            <div className='flex justify-between items-center mb-1 '>
            <p className="text-base">Date</p>
            <span className='text-gray-500'>{date}</span>
            </div>
            <div className='border-solid] border-2 border-red-600 rounded-lg px-2 '>
                <p className='text-red-500 text-sm'>{message}</p>

            </div>
         
            
          </div>
        </div>
    </div>
  )
}

export default PermissionsDenied


