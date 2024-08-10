import React from 'react';

export default function Banner() {
  return (
    <section className='h-96 relative'>
      <div className='w-full h-full bg-cover bg-banner' />
      <div className='absolute w-full top-40 text-center text-gray-50 drop-shadow-2xl'>
        <h2 className='font-stix text-7xl'>Shop With Us</h2>
        <p className='font-stix text-2xl py-6'>Premium Products, Great Deals</p>
      </div>
    </section>
  );
}
