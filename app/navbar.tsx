"use client"; // This directive indicates that this component is a client component

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md z-10 relative">
            <div className="container w-full mx-auto flex items-center justify-between py-4 px-6 md:hidden">
                {/* Logo for Small Screens */}
                <div className="text-2xl font-bold">
                    <Link href="#" className="text-black">Muskan <span className="text-sm font-normal block text-center">Threading</span></Link>
                </div>
                {/* Hamburger Menu for Small Screens */}
                <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Off-Canvas Menu */}
            <div className={`fixed inset-0 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleMenu} className="text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                {/* Logo (Visible in off-canvas menu) */}
                <div className="text-2xl font-bold text-center mb-4">
                    <Link href="#" className="text-black">Muskan <span className="text-sm font-normal block">Threading</span></Link>
                </div>
                <div className="flex flex-col items-center space-y-4 mt-10">
                    <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">About</Link>
                    <Link href="/ourservices" className="text-gray-700 hover:text-gray-900 font-medium">Services</Link>
                    <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</Link>
                </div>
            </div>

            {/* Collapsing Navbar Logic */}
            <div className="container mx-auto flex items-center justify-center py-4 px-6 hidden md:flex">
                {/* Left Side: Links */}
                <div className="flex space-x-4 mr-12">
                    <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">About</Link>
                    <Link href="/ourservices" className="text-gray-700 hover:text-gray-900 font-medium">Services</Link>
                </div>

                {/* Center: Logo */}
                <div className="text-2xl font-bold">
                    <Link href="#" className="text-black">Muskan <span className="text-sm font-normal block text-center">Threading</span></Link>
                </div>

                {/* Right Side: Links and Button */}
                <div className="flex items-center space-x-4 ml-12">
                    <Link href="#" className="text-gray-700 hover:text-gray-900 font-medium">Our Team</Link>
                    <button onClick={() => router.push('/contact')} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Contact US</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;