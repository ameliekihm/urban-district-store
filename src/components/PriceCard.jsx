import React from 'react';

export default function PriceCard({ text, price }) {
  return (
    <div className='tracking-wide p-8 mx-2 rounded-2xl text-center text-lg md:text-2xl'>
      <p>{text}</p>
      <p className='font-bold text-brand text-xl md:text-2xl'>{`US $${price}.00`}</p>
    </div>
  );
}
