

export default function Home() {
    return (
        <>

            {/* Hero Section with Smoother Clip-Path and Animated Circle */}
            <div
                className="torn-paper bg-blue-200"
                style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 90% 81%, 80% 83%, 70% 85%, 60% 87%, 50% 89%, 40% 91%, 30% 93%, 20% 95%, 10% 97%, 0% 100%)',
                }}
            >
                <div className="px-30 mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start mb-4">
                            <i className="fas fa-spa text-4xl text-pink-500"></i>
                            <div className="border-t-2 border-pink-500 w-16 ml-2"></div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                            Experience the Best Beauty
                        </h1>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-pink-500 mb-4">
                            Services
                        </h2>
                        <p className="text-gray-600 mb-8">
                            There are many variations
                        </p>
                        <a className="bg-pink-500 text-white py-2 px-6 rounded-full flex items-center justify-center inline-block" href="#">
                            <i className="fas fa-calendar-alt mr-2"></i>
                            Make Appointment
                        </a>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                        <div className="relative layerImage"> {/* Added layerImage class */}
                            <img
                                alt="A woman applying makeup with a brush, with a green leaf in the background"
                                className="rounded-full border-8 border-pink-100"
                                height="500"
                                src="https://storage.googleapis.com/a1aa/image/Ix2X4oDC2TdKGgYQKHwTduvNq4I8kH5PhbXfG2pSZdg.jpg"
                                width="500"
                            />

                        </div>
                    </div>
                </div>
            </div>

            <div className="px-20">

                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold">
                            <span className="pe-2">An Increadible</span>
                            <span className="text-pink-400">
                                Spa Experience
                            </span>
                        </h1>
                        <p className="text-gray-600 mt-4 px-50">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                            accumsan lacus vel facilisis.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative z-2 rounded-lg" >
                            <div>
                                <div className="absolute w-full h-full z-3 rounded-lg" style={{ background: "url('./makeup.jpg')", backgroundSize: "cover" }}></div>
                                <div className="py-25 ps-20 pe-60 z-5 relative">
                                    <h1 className="text-2xl font-bold mb-4">
                                        Clay Masks
                                    </h1>
                                    <p className="text-gray-600 mb-4">
                                        A good clay mask can go a long way to draw out impurities skin.
                                    </p>
                                    <a className="bg-pink-400 text-white px-4 py-2 rounded-full absolute bottom-8 inline-block" href="#">
                                        <i className="fas fa-shopping-cart mr-2">
                                        </i>
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="relative bg-blue-400 z-2 rounded-lg" >
                            <div>
                                <div className="absolute w-full h-full z-3 ms-20 rounded-lg" style={{ background: "url('./womenbg.png')", backgroundSize: "cover", backgroundPosition: "left" }}></div>
                                <div className="py-25 ps-20 pe-60  z-5 relative">
                                    <h1 className="text-2xl font-bold mb-4">
                                        Wellness &amp; Spa
                                    </h1>
                                    <p className="text-gray-600 mb-4">
                                        A good clay mask can go a long way to draw out impurities skin.
                                    </p>
                                    <a className="bg-pink-400 text-white px-4 py-2 rounded-full absolute bottom-8 inline-block" href="#">
                                        <i className="fas fa-shopping-cart mr-2">
                                        </i>
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                        <div className="md:w-1/2 p-4">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-quote-left text-orange-500 mr-2">
                                </i>
                                <span className="text-gray-500 font-semibold">
                                    TESTIMONIALS
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold mb-4">
                                What Our Customers Saw
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper
                                mattis, pulvinar s leo.
                            </p>
                            <a className="bg-orange-500 text-white px-6 py-2 rounded-full flex items-center inline-block" href="#">
                                SEE MORE
                                <i className="fas fa-arrow-right ml-2">
                                </i>
                            </a>
                            <div className="flex mt-6">
                                <img alt="Customer 1" className="w-10 h-10 rounded-full border-2 border-white -ml-2" height="40"
                                    src="https://storage.googleapis.com/a1aa/image/YAwGYeeaCgk4pdxmZ28I-iVUxkO-ecYc8S7Wu6M_rNQ.jpg"
                                    width="40" />
                                <img alt="Customer 2" className="w-10 h-10 rounded-full border-2 border-white -ml-2" height="40"
                                    src="https://storage.googleapis.com/a1aa/image/xoJPY8fOJyKBKeMbMlrFYYF3Rm5b7gM2sp75pVkBcBw.jpg"
                                    width="40" />
                                <img alt="Customer 3" className="w-10 h-10 rounded-full border-2 border-white -ml-2" height="40"
                                    src="https://storage.googleapis.com/a1aa/image/aObMUr0OwxK2yMx1aariNalgyKEXcb9s3fz1FYyIec0.jpg"
                                    width="40" />
                                <img alt="Customer 4" className="w-10 h-10 rounded-full border-2 border-white -ml-2" height="40"
                                    src="https://storage.googleapis.com/a1aa/image/Z6EC9YdBSeVv06wKOcvFWWMmKRdt0V2iXGCL1Coqr5k.jpg"
                                    width="40" />
                                <div
                                    className="w-10 h-10 rounded-full border-2 border-white -ml-2 bg-gray-300 flex items-center justify-center text-gray-600">
                                    +
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex flex-col md:flex-row justify-between p-4 gap-4">
                            <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
                                <div className="text-orange-500 text-4xl mb-4">
                                    <i className="fas fa-quote-left"></i>
                                </div>
                                <p className="text-gray-700 mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.
                                </p>
                                <div className="flex justify-center mb-4">
                                    <div className="svg-star"><img src="./star.svg" alt="" className="w-5 pe-1" /></div>
                                    <div className="svg-star"><img src="./star.svg" alt="" className="w-5 pe-1" /></div>
                                    <div className="svg-star"><img src="./star.svg" alt="" className="w-5 pe-1" /></div>
                                    <div className="svg-star"><img src="./star.svg" alt="" className="w-5 pe-1" /></div>
                                    <div className="svg-star"><img src="./star.svg" alt="" className="w-5 pe-1" /></div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
                                    <img alt="Profile picture of Mukti Biswas" className="w-16 h-16 rounded-full border-2 border-orange-500" src="https://placehold.co/100x100" />
                                </div>
                                <div className="mt-10">
                                    <h3 className="text-gray-900 font-semibold pb-4">MUKTI BISWAS</h3>
                                </div>
                            </div>


                            <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
                                <div className="text-orange-500 text-4xl mb-4">
                                    <i className="fas fa-quote-left"></i>
                                </div>
                                <p className="text-gray-700 mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.
                                </p>
                                <div className="flex justify-center mb-4">
                                    <div className="svg-star"><img src="./star.svg" alt="" className="w-5 pe-1" /></div>
                                    <div className="svg-star"><img src="./star.svg" alt="" className="w-5 pe-1" /></div>
                                    <div className="svg-star"><img src="./star.svg" alt="" className="w-5 pe-1" /></div>
                                    <div className="svg-star"><img src="./star.svg" alt="" className="w-5 pe-1" /></div>
                                    <div className="svg-star"><img src="./star.svg" alt="" className="w-5 pe-1" /></div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
                                    <img alt="Profile picture of Mukti Biswas" className="w-16 h-16 rounded-full border-2 border-orange-500" src="https://placehold.co/100x100" />
                                </div>
                                <div className="mt-10">
                                    <h3 className="text-gray-900 font-semibold">MUKTI BISWAS</h3>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            {/* Service 1: Nail Care */}
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 0c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
                                        </path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Nail Care</h3>
                                <p className="text-gray-600">
                                    Risus auctor ligula tempus dolor vitae neque feugiat ligula suscipit and risus mauri
                                </p>
                            </div>

                            {/* Service 2: Nail Art */}
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm0 0c1.66 0 3 1.34 3 3v3h-6v-3c0-1.66 1.34-3 3-3zm-6 0c-1.66 0-3 1.34-3 3v3h6v-3c0-1.66-1.34-3-3-3z">
                                        </path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Nail Art</h3>
                                <p className="text-gray-600">
                                    Risus auctor ligula tempus dolor vitae neque feugiat ligula suscipit and risus mauri
                                </p>
                            </div>

                            {/* Service 3: Add-Ons */}
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4">
                                        </path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Add-Ons</h3>
                                <p className="text-gray-600">
                                    Risus auctor ligula tempus dolor vitae neque feugiat ligula suscipit and risus mauri
                                </p>
                            </div>

                            {/* Service 4: Treatments */}
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.1" d="M4.44905 17.0091C-0.246262 7.83768 7.34063 0.686186 19.5547 3.61251C20.4161 3.81888 21.0082 4.6099 20.9652 5.49458C20.5863 13.288 17.0342 17.7048 6.13264 17.9858C5.43034 18.0039 4.7692 17.6344 4.44905 17.0091Z" fill="#323232" />
                                        <path d="M4.44905 17.0091C-0.246262 7.83768 7.34063 0.686186 19.5547 3.61251C20.4161 3.81888 21.0082 4.6099 20.9652 5.49458C20.5863 13.288 17.0342 17.7048 6.13264 17.9858C5.43034 18.0039 4.7692 17.6344 4.44905 17.0091Z" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3.99987 21C5.49993 15.5 5.99988 12.5 11.9998 9.99997" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Treatments</h3>
                                <p className="text-gray-600">
                                    Risus auctor ligula tempus dolor vitae neque feugiat ligula suscipit and risus mauri
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>



        </>
    );

}
