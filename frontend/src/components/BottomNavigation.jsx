import React from 'react';
import { FaHome, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { TbShieldLockFilled } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";


const BottomNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    
  return (
    <div className='flex justify-center max-h-16 bg-gray-50 dark:bg-slate-600'>
      

        <div class="fixed z-50 w-full h-16 max-w-md rounded-t-xl -translate-x-1/2  border-t border-gray-200  bottom-0 left-1/2 bg-slate-200 dark:bg-slate-700 dark:border-slate-700 overflow-hidden">
            <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
                
                
                <button 
                    onClick={() => navigate("/")} 
                    className={`inline-flex flex-col items-center justify-center px-5 hover:bg-blue-200 dark:hover:bg-gray-800 
                        group ${location.pathname === "/" ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"
                    }`}>
                    <FaHome 
                        className={`group-hover:text-blue-600 dark:group-hover:text-blue-500 w-6 h-6 transform hover:scale-125 transition-transform duration-300 ease-in-out`}
                        fill="currentColor"
                        aria-hidden="true"
                    />

                    {/* <span className="absolute bottom-0 hidden group-hover:flex items-center justify-center px-3 py-1 text-xs font-light dark:text-slate-400">
                        Home
                    </span> */}
                            
                </button>
                




                <button 
                    onClick={() => navigate("/askpermission")} 
                    className={`inline-flex flex-col items-center justify-center px-5 hover:bg-blue-200 dark:hover:bg-gray-800 
                        group ${location.pathname === "/askpermission" ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"
                    }`}>
                    <TbShieldLockFilled 
                        className={`group-hover:text-blue-600 dark:group-hover:text-blue-500 w-6 h-6 transform hover:scale-125 transition-transform duration-300 ease-in-out`}
                        fill="currentColor"
                        aria-hidden="true"
                    />

                    {/* <span className="absolute bottom-0 hidden group-hover:flex items-center justify-center px-3 py-1 text-xs font-light dark:text-slate-400">
                        Ask Permission
                    </span> */}
                            
                </button>


                <div class="flex items-center justify-center">
                    <button  
                    onClick={() => navigate("/entrancepage")} 
                    class={`inline-flex items-center justify-center w-16 h-16 font-medium  rounded-lg hover:bg-blue-300 dark:hover:bg-slate-800 group ${location.pathname === "/entrancepage" ? "text-slate-800 dark:text-blue-500 bg-blue-300 dark:bg-slate-800" : "text-slate-700 dark:text-slate-200 bg-slate-300 dark:bg-slate-600"}`}>
                    
                    <MdOutlineQrCodeScanner
                        className={`group-hover:text-slate-800 dark:group-hover:text-blue-500 w-10 h-10 transform hover:scale-125 transition-transform duration-300 ease-in-out`}
                        fill="currentColor"
                        aria-hidden="true"
                    />

                    {/* <span className="absolute bottom-0 hidden group-hover:flex items-center justify-center px-3 py-1 text-xs font-light dark:text-slate-400">
                        Go in
                    </span> */}
                            
                </button>
                </div>
                


                <button 
                    onClick={() => navigate("/settings")} 
                    className={`inline-flex flex-col items-center justify-center px-5 hover:bg-blue-200 dark:hover:bg-gray-800 
                        group ${location.pathname === "/settings" ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"
                    }`}>
                    <IoMdSettings 
                        className={`group-hover:text-blue-600 dark:group-hover:text-blue-500 w-6 h-6 transform hover:scale-125 transition-transform duration-300 ease-in-out`}
                        fill="currentColor"
                        aria-hidden="true"
                    />

                    {/* <span className="absolute bottom-0 hidden group-hover:flex items-center justify-center px-3 py-1 text-xs font-light dark:text-slate-400">
                        Settings
                    </span> */}
                            
                </button>


                <button 
                    onClick={() => navigate("/profile")} 
                    className={`inline-flex flex-col items-center justify-center px-5 hover:bg-blue-200 dark:hover:bg-gray-800 
                        group ${location.pathname === "/profile" ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"
                    }`}>
                    <FaUser 
                        className={`group-hover:text-blue-600 dark:group-hover:text-blue-500 w-6 h-6 transform hover:scale-125 transition-transform duration-300 ease-in-out`}
                        fill="currentColor"
                        aria-hidden="true"
                    />

                    {/* <span className="absolute bottom-0 hidden group-hover:flex items-center justify-center px-3 py-1 text-xs font-light dark:text-slate-400">
                        Profile
                    </span> */}
                            
                </button>
            </div>
        </div>

    </div>
  )
}

export default BottomNavigation
