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
      className='
        rounded-sm shadow-md overflow-hidden cursor-pointer
        transition-all hover:scale-105 bg-white
      '
    >
      <div className='w-full h-[350px] overflow-hidden'>
        <img className='w-full h-full object-cover' src={image} alt={title} />
      </div>
      <div className='mt-2 px-3 text-md items-center'>
        <h3 className='font-semibold'>{title}</h3>
        <p>{`US $${price}.00`}</p>
      </div>
      <p className='mb-3 px-3 text-gray-500'>{category}</p>
    </li>
  );
}
