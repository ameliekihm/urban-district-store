import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { FaPlus } from 'react-icons/fa';
import { FaEquals } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { PiHeartbeatBold } from 'react-icons/pi';

const SHIPPING = 7;

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery({
    queryKey: ['carts'],
    queryFn: () => getCart(uid),
  });
  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );
  return (
    <section className='px-8 pb-8 '>
      <p className='tracking-wide py-6 text-3xl text-center font-bold border-b border-gray-300 bg-slate-100'>
        Shopping Bag
      </p>
      {!hasProducts && (
        <p className='text-center py-6 text-red-500 text-lg'>
          Your Shopping Bag Is Empty.
        </p>
      )}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-200 py-4 px-8'>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className='rounded-s-sm shadow-lg flex flex-col bg-slate-100 pt-5'>
            <p className='tracking-wide text-3xl text-center font-bold pb-4 border-b relative -left-3.5'>
              Order Summary
            </p>

            <div className='flex justify-around items-center py-6 md:px-8 lg:px-12 bg-white'>
              <PriceCard text='Subtotal' price={totalPrice} />
              <FaPlus className='shrink-0' />
              <PriceCard text='Standard Shipping' price={SHIPPING} />
              <FaEquals className='shrink-0' />
              <PriceCard text='Estimated Total' price={totalPrice + SHIPPING} />
            </div>

            <Button
              text='PROCEED TO CHECKOUT '
              className='tracking-wider font-semibold'
              icon={<PiHeartbeatBold />}
            />
          </div>
        </>
      )}
    </section>
  );
}
