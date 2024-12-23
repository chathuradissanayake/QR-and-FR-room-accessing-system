import React from 'react';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();

  return (
    <>
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600 ">
    <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800">

    
    <div className="title flex items-center space-x-2 mb-8 dark:text-slate-100">
    <Link to="/">
        <GoChevronLeft className="cursor-pointer" />
    </Link>
        <span className='font-semibold'>Settings</span>
    </div>



   
    <nav class="flex min-w-[240px] flex-col gap-1 p-1.5 dark:text-slate-100">
        <div
            role="button"
            onClick={() => navigate('/language')}
            class="text-slate-800 dark:text-slate-100 dark:hover:bg-slate-600 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-between">
            Language
            <GoChevronRight className='text-gray-500'/>
        </div>
        <hr></hr>

        <div
            role="button"
            onClick={() => navigate('/theme')}
            class="text-slate-800 dark:text-slate-100 dark:hover:bg-slate-600  flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-between">
            Theme
            <GoChevronRight className='text-gray-500'/>
        </div>
        <hr></hr>

        <div
            role="button"
            onClick={() => navigate('/app-info')}
            class="text-slate-800 dark:text-slate-100 dark:hover:bg-slate-600  flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-between">   
            App Information
            <GoChevronRight className='text-gray-500'/>
        </div>
        <hr></hr>


        <div
            role="button"
            onClick={() => navigate('/contactus')}
            class="text-slate-800 dark:text-slate-100 dark:hover:bg-slate-600  flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-between">
            Customer Care
            <GoChevronRight className='text-gray-500'/>
        </div>
        <hr></hr>

        <div
            role="button"
            onClick={() => navigate('/aboutus')}
            class="text-slate-800 dark:text-slate-100 dark:hover:bg-slate-600  flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-between">
            About us
            <GoChevronRight className='text-gray-500'/>
        </div>
        <hr></hr>
    </nav>


    </div>
    </div>
    </>
  )
}

export default Settings
