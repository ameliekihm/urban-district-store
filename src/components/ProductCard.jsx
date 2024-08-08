import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
  product,
  product: { id, image, title, category, price },
}) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className='rounded-s-sm shadow-sm overflow-hidden 
    cursor-pointer w-50 transition-all hover:scale-105'
    >
      <img className='w-full' src={image} alt={title} />
      <div className='mt-2 px-2 text-md items-center'>
        <h3 className='font-semibold'>{title}</h3>
        <p>{`US $${price}.00`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-500'>{category}</p>
    </li>
  );
}
