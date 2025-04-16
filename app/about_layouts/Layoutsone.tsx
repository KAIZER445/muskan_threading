import React from 'react'

const Layoutsone = () => {
  return (
      <div className="container mx-auto mb-10 mt-10 px-0 lg:px-30">
        <div className='flex flex-col md:flex-row gap-4'>
        <div className='w-full md:w-1/2 p-5'>
        <img src="https://img.freepik.com/free-photo/african-american-woman-applying-makeup-by-makeup-artist-beauty-saloon_627829-4589.jpg?t=st=1744528461~exp=1744532061~hmac=7c0a344104203af969f9aad24dfa4fd7508193e06c0f66c2c8ea65ce6385d77b&w=1380" alt="girl with brush" className='w-full h-full rounded-lg shadow-lg border border-grey-300 transition-transform duration-300 hover:scale-102'/>
        </div>
        <div className='w-full md:w-1/2 px-5'>
            <h1 className='text-5xl font-bold mb-4 pt-2'>About Us</h1>
            <p className='font-bold tracking-widest text-lg pt-2'>Get To Know About Us</p>
            <p className='text-base pt-5 text-justify'>Looks <span className='font-bold'>Threading Beauty Salon</span> is a place where you can bring
                     yourself to love your face all the more with our beauty services.
                     We provide a long list of services and make sure that we deliver
                     the best quality of service. We have highly trained and
                     experienced beauticians who have honed their skills with the
                     time they have spent in the self-care industry. If you are looking
                     for reliable and trustworthy beautification services, we are here to
                     fulfill all your needs. All you have to do is contact us and we will
                     assist you in every possible way. Welcome to the world of glamour
                     and beauty where you fall in love with yourself.</p>
        </div>
        </div>
      </div>
  )
}

export default Layoutsone