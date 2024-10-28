import React from 'react';

const LogCard = ({ room, roomcode, door, branch, intime, outtime, date, state }) => {

  const convertToMinutes = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }


    return hours * 60 + minutes;
  };
  // Function to calculate the duration between intime and outtime
  const calculateDuration = (inTime, outTime) => {
    const inTotalMinutes = convertToMinutes(inTime);
    const outTotalMinutes = convertToMinutes(outTime);

    // Calculate the difference
    const durationMinutes = outTotalMinutes - inTotalMinutes;

    // Convert back to hours and minutes
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours} hour ${minutes} minutes`;
  };

const duration = calculateDuration(intime, outtime);

  return (
    <div>
      <div className="bg-white shadow rounded-lg pt-3 pb-3 pl-5 pr-5  ">
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
            <p className="text-base">Duration</p>
            <span className='text-gray-500'>{duration}</span>
            </div>
            <div className='flex justify-between items-center mb-1 '>
            <p className="text-base">Date</p>
            <span className='text-gray-500'>{date}</span>
            </div>
            <div className='flex justify-between items-center mb-1 '>
            <p className="text-base">State</p>
            <img src={state} alt={state} className="w-20" />
            </div>
            
            
          </div>
          {/* <img src={state} alt={title} className="w-10 h-10" /> */}
        </div>
    </div>
  )
}

export default LogCard







// // Function to calculate the duration between inTime and outTime
// const calculateDuration = (inTime, outTime) => {
//   const [inHours, inMinutes] = inTime.split(':').map(Number);
//   const [outHours, outMinutes] = outTime.split(':').map(Number);

//   // Convert both times to minutes
//   const inTotalMinutes = inHours * 60 + inMinutes;
//   const outTotalMinutes = outHours * 60 + outMinutes;

//   // Calculate the difference
//   const durationMinutes = outTotalMinutes - inTotalMinutes;

//   // Convert back to hours and minutes
//   const hours = Math.floor(durationMinutes / 60);
//   const minutes = durationMinutes % 60;

//   return `${hours} hour ${minutes} minutes`;
// };

// const duration = calculateDuration(intime, outtime);
