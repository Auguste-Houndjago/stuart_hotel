"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const MobileButton: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-[100px] right-8 flex flex-col items-end md:hidden">
            
                <button 
                    onClick={() => router.push('/hotel/new')}

                    className={isOpen?" mb-4 mr-1 bg-[#1e1e1e]  hover:bg-blue-500 dark:text-[#ffdd00] font-[700] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-400 border-2 border-black focus:shadow-one focus:scale-95 hover:shadow-none hover:scale-95 " : "hidden transition-all -translate-y-15"}

                > <span  className='grid items-center justify-center'>hotel
                    </span>
                    <span className='absolute opacity-50 dark:text-white'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={8} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>

                    <span  >
                    </span>
                </button>
        

           {isOpen? <></>:<div className='shadow-md bg-black'>  </div>
            }

            <button 
                onClick={toggleOpen}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
};

export default MobileButton;