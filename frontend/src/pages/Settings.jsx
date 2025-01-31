import React from 'react';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();

    const handleBackNavigation = () => {
        navigate(-1);
    };

  return (
    <>
    <div >
    

    
        <div className="title flex items-center space-x-2 mb-8 dark:text-slate-100">
            <GoChevronLeft className="cursor-pointer" onClick={handleBackNavigation} />
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
                Contact us
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
    
    </>
  )
}

export default Settings
