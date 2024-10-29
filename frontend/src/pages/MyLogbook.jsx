import React from 'react';
import { GoChevronLeft } from "react-icons/go";
import { Link } from 'react-router-dom';
import NotUsed from '../assets/notused.png';
import Used from '../assets/used.png';
import LogSearch from '../components/LogSearch';
import LogCard from '../components/Logcard';

export default function MyLogbook() {

    // const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">

    <div className="title flex items-center space-x-2 mb-8">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>My LogBook</span>
    </div>
    
    {/* searchbar */}
    <div><LogSearch/></div>

    <div className="space-y-4">
      
    <LogCard
    room="Main Office"
    roomcode="M06"
    door="Main Door"
    branch="Colombo"
    intime="11:22 AM"
    outtime="1:44 PM"
    date="21/08/2024"
    state={Used}
    />
    
    <LogCard
    room="Conference Room"
    roomcode="C06"
    door="Main Door"
    branch="Colombo"
    intime=""
    outtime=""
    date="29/08/2024"
    state={NotUsed}
    />
    </div>

    </div>
    </div>
  )
}
