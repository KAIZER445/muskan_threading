import React from 'react'

const Layoutstwo = () => {
  return (
    <div>
    <section className="container mx-auto p-6 py-10">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          
          {/* 1989 */}
          <div className='shadow-xl rounded-lg flex items-center justify-center transition-transform duration-500 hover:scale-90' style={{backgroundColor:'#ffff', height: '250px'}}>
            <div className='text-center p-3'>
            <h2 className="text-4xl font-bold text-gray-900">1989</h2>
            <h3 className="text-lg font-semibold mt-2">The Beginning Of Our Journey</h3>
            <p className="text-sm text-gray-600 mt-2">
              Looks Salon was founded in the thriving city of Mumbai. In the next 13 years, we expanded to 15 different locations.
            </p>
            </div>
          </div>

          {/* 2006 */}
          <div className='shadow-xl rounded-lg flex items-center justify-center transition-transform duration-500 hover:scale-90' style={{ backgroundColor: '#ffff', height: '250px' }}>
            <div className='text-center p-3'>
              <h2 className="text-4xl font-bold text-gray-900">2006</h2>
              <h3 className="text-lg font-semibold mt-2">New Beginnings</h3>
              <p className="text-sm text-gray-600 mt-2">We spread our wings and opened our first branch in East Village, New York.</p>
            </div>
          </div>

          {/* 2010 */}
          <div>
            <div className='shadow-xl rounded-lg flex items-center justify-center transition-transform duration-500 hover:scale-90' style={{ backgroundColor: '#ffff', height: '250px' }}>
              <div className='text-center p-3'>
                <h2 className='text-4xl font-bold text-gray-900'>2010</h2>
                <h3 className='text-lg font-semibold mt-2'>Expansion</h3>
                <p className='text-sm text-gray-600 mt-2'>The second barnch of Looks Salon opened its doors to customers</p>
              </div>
            </div>
          </div>

          {/* 2019 */}
          <div>
            <div className='shadow-xl rounded-lg flex items-center justify-center transition-transform duration-500 hover:scale-90' style={{backgroundColor: '#ffff', height:'250px'}}>
              <div className='text-center p-3'>
                <h2 className='text-4xl font-bold text-gray-900'>2019</h2>
                <h3 className='text-lg font-semibold mt-2'>The Future</h3>
                <p className='text-sm text-gray-600 mt-2'>Looks Salon expanded to four locations in New York. And we're just getting started</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    </div>
  )
}

export default Layoutstwo
