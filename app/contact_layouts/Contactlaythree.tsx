import Link from 'next/link';
import React from 'react';

interface ContactLayThreeProps {
  instagramHandle: string;
  instagramLink: string;
  address: string;
  phone: string;
  email: string;
  emailLink: string;
  formSubmitUrl: string;
}

const Contactlaythree: React.FC<ContactLayThreeProps> = ({
  instagramHandle,
  instagramLink,
  address,
  phone,
  email,
  emailLink,
  formSubmitUrl,
}) => {
  return (
    <div className="container mx-auto lg:px-32 px-2 py-3">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h1 className="font-bold text-3xl py-4">Get In Touch With Us</h1>
          <h1 className="text-lg tracking-widest pb-8">Many ways to reach us:</h1>
          <div className="flex flex-col md:flex-row lg:gap-30 gap-5 py-5">
            <div className="">
              <div className="flex gap-3">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                    fill="#be9a76"
                  />
                  <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#be9a76" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                    fill="#be9a76"
                  />
                </svg>
                <div>
                  <Link href={instagramLink} className="font-bold">{instagramHandle}</Link>
                  <p className="text-sm pt-2">Follow us on Instagram</p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex gap-3">
                <svg width="30px" height="30px" viewBox="-4 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>location</title>
                  <desc>Created with Sketch Beta.</desc>
                  <defs />
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Icon-Set" transform="translate(-104.000000, -411.000000)" fill="#be9a76">
                      <path
                        d="M116,426 C114.343,426 113,424.657 113,423 C113,421.343 114.343,420 116,420 C117.657,420 119,421.343 119,423 C119,424.657 117.657,426 116,426 L116,426 Z M116,418 C113.239,418 111,420.238 111,423 C111,425.762 113.239,428 116,428 C118.761,428 121,425.762 121,423 C121,420.238 118.761,418 116,418 L116,418 Z M116,440 C114.337,440.009 106,427.181 106,423 C106,417.478 110.477,413 116,413 C121.523,413 126,417.478 126,423 C126,427.125 117.637,440.009 116,440 L116,440 Z M116,411 C109.373,411 104,416.373 104,423 C104,428.018 114.005,443.011 116,443 C117.964,443.011 128,427.95 128,423 C128,416.373 122.627,411 116,411 L116,411 Z"
                        id="location"
                      />
                    </g>
                  </g>
                </svg>
                <div>
                  <p className="font-bold pb-2">{address}</p>
                  <p className="text-sm">Try on our dresses in showroom</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row lg:gap-30 gap-5 py-5">
            <div className="">
              <div className="flex gap-3">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                    stroke="#be9a76"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                </svg>
                <div>
                  <p className="font-bold pb-2">{phone}</p>
                  <p className="text-sm">Contact us by telephone</p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex gap-3">
                <svg width="30px" height="30px" viewBox="0 -4 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>mail</title>
                  <desc>Created with Sketch Beta.</desc>
                  <defs />
                  <g id="Page-1" stroke="#be9a76" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Icon-Set" transform="translate(-412.000000, -259.000000)" fill="#be9a76">
                      <path
                        d="M442,279 C442,279.203 441.961,279.395 441.905,279.578 L433,270 L442,263 L442,279 L442,279 Z M415.556,280.946 L424.58,271.33 L428,273.915 L431.272,271.314 L440.444,280.946 C440.301,280.979 415.699,280.979 415.556,280.946 L415.556,280.946 Z M414,279 L414,263 L423,270 L414.095,279.578 C414.039,279.395 414,279.203 414,279 L414,279 Z M441,261 L428,271 L415,261 L441,261 L441,261 Z M440,259 L416,259 C413.791,259 412,260.791 412,263 L412,279 C412,281.209 413.791,283 416,283 L440,283 C442.209,283 444,281.209 444,279 L444,263 C444,260.791 442.209,259 440,259 L440,259 Z"
                        id="mail"
                      />
                    </g>
                  </g>
                </svg>
                <div>
                  <Link href={emailLink} className="font-bold">{email}</Link>
                  <p className="text-sm pt-2">Write us a message</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-black">
          <div className="bg-black text-white flex items-center justify-center px-6 py-8">
            <form className="w-full max-w-md space-y-4" action={formSubmitUrl} method="POST">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-black border-b border-dashed border-gray-400 focus:outline-none text-white py-1"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-black border-b border-dashed border-gray-400 focus:outline-none text-white py-1"
                  required
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full bg-black border-b border-dashed border-gray-400 focus:outline-none text-white py-1"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-black border-b border-dashed border-gray-400 focus:outline-none text-white py-1 resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-[#d1a663] text-black px-6 py-2 font-semibold hover:bg-[#c59b56] transition-all duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactlaythree;