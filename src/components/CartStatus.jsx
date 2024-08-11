import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import useCart from '../hooks/useCart';

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className='relative'>
      <HiOutlineShoppingBag className='text-3xl mr-2' />
      {products && (
        <p
          className='w-5 h-5 text-center text-sm bg-red-400
         text-white font-bold rounded-full absolute -bottom-2 -right-0'
        >
          {products.length}
        </p>
      )}
    </div>
  );
}
