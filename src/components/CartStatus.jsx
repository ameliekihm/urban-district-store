import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function CartStatus() {
  const { uid } = useAuthContext();

  const { data: products } = useQuery({
    queryKey: ['carts'],
    queryFn: () => getCart(uid),
  });
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
