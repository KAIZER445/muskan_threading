import React from 'react'

const Teamlayoutone = () => {
    return (
        <div className='container mx-auto lg:px-30 px-5'>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full pt-10 pb-5 space-y-4 md:space-y-0 pt-30">
                {/* Left Side: Icon + Text */}
                <div className="border-2 rounded-3xl px-3 flex items-center space-x-2">
                    <div className="flex items-center space-x-2 text-sm p-1">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5a6.22,6.22,0,0,0,1.75,3.75C7,8,17,8,17,8Z" />
                            <rect width="24" height="24" fill="none" />
                        </svg>
                        <p className="text-sm sm:text-base">Our Team</p>
                    </div>
                </div>

                {/* Right Side: Description */}
                <div className="text-left md:text-right text-gray-700 text-sm sm:text-base max-w-full md:max-w-xl">
                    <p>
                        Meet the passionate individuals behind our success, a dedicated team committed to excellence, innovation, and collaboration.
                    </p>
                </div>
            </div>
            <div className='flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl mx-auto py-4'>
                <div className='text-sm text-gray-700 mb-2 sm:mb-0'>
                    <p>Our Expert Team to Tranquility at Spa</p>
                </div>
                <a href="#"
                    className="flex items-center border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition duration-200">
                    <span className="text-sm text-gray-700 mr-2">more team</span>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default Teamlayoutone
