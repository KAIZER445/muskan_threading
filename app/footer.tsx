import React from 'react';

const Footer: React.FC = () => {
return(
    <div className="text-black bg-yellow-600" >
                <footer className="px-20 pt-10 pb-10 " style={{ background: 'url(./footer-bg.png)',backgroundSize: 'cover'}}>
                    <div
                        className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-start space-y-8 md:space-y-0 md:space-x-8">
                        <div className="flex-1">
                            <div className="flex items-center mb-4">
                                <img alt="HairCutter logo" className="mr-2" height="50"
                                    src="https://storage.googleapis.com/a1aa/image/nsDonQZpOC_iGqYaLLjOPci7TduirUJcttEx53cD3Z0.jpg"
                                    width="50" />
                                <div>
                                    <h1 className="text-2xl font-bold text-black">
                                        HairCutter
                                    </h1>
                                    <p className="text-sm text-black">
                                        BARBER SHOP
                                    </p>
                                </div>
                            </div>
                            <p className="mb-4 text-black">
                                Etiam semper nibh orci, ac tincidunt mi consectetur a. In quis tortor ex. Morbi cursus sed neque
                                quis dictum.
                            </p>
                            <div className="flex">
                                <input className="p-2 rounded-l bg-white text-black" placeholder="Enter Your Email address"
                                    type="email" />
                                <a className="bg-orange-500 p-2 rounded-r inline-block" href="#">
                                    <i className="fas fa-paper-plane text-white px-2">
                                    </i>
                                </a>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold mb-4 text-black">
                                USEFUL LINKS
                            </h2>
                            <ul className="space-y-2">
                                <li>
                                    <a className="hover:underline text-black" href="#">
                                        Help
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:underline text-black" href="#">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:underline text-black" href="#">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:underline text-black" href="#">
                                        Refunds &amp; Returns
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:underline text-black" href="#">
                                        Help &amp; FAQ's
                                    </a>
                                </li>

                            </ul>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold mb-4 text-black">
                                CONTACT US
                            </h2>
                            <p className="mb-2 text-black">
                                <span className="font-bold">
                                    Phone:
                                </span>
                                +010 234 789234
                            </p>
                            <p className="mb-2 text-black">
                                <span className="font-bold">
                                    Fax:
                                </span>
                                +010 435 579892
                            </p>
                            <p className="mb-2 text-black">
                                <span className="font-bold">
                                    Email:
                                </span>
                                info@mustachea.com
                            </p>
                            <p className="mb-2 text-black">
                                1394 Argonne Street, New Castle, USA
                            </p>
                        </div>
                    </div>

                </footer>
                <div className="bg-gray-800 py-4">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-white">
                            Copyright © 2025, Muskan Threading Powered by
                            <a className="text-orange-500 hover:underline" href="#">
                                Infinitygalactech
                            </a>
                        </p>
                    </div>
                </div>
            </div>
)
}

export default Footer;