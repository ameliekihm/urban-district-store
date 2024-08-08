import React from 'react';

export default function ProductCard({
  product: { id, image, title, category, price },
}) {
  return (
    <li className='rounded-s-sm shadow-sm overflow-hidden cursor-pointer w-50'>
      <img className='w-full' src={image} alt={title} />
      <div className='mt-2 px-2 text-md items-center'>
        <h3 className='font-semibold'>{title}</h3>
        <p>{`US $${price}.00`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-500'>{category}</p>
    </li>
  );
}
