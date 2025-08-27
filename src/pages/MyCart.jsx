import React from 'react';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { FaPlus, FaEquals } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { PiHeartbeatBold } from 'react-icons/pi';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import useCart from '../hooks/useCart';

const SHIPPING = 7;

export default function MyCart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;

  const totalPrice =
    products &&
    products.reduce(
      (prev, current) =>
        prev + Number(current.snapshot?.price || 0) * current.quantity,
      0
    );

  return (
    <section className='px-8 pb-6'>
      <p className='tracking-wide py-6 text-3xl text-center font-bold bg-slate-100'>
        Shopping Bag
      </p>
      {!hasProducts && (
        <section className='relative h-80'>
          <div className='absolute inset-0 bg-white bg-opacity-50' />
          <div className='w-full h-full bg-contain bg-center bg-no-repeat bg-emptyCart' />
          <div className='flex justify-center items-center relative -top-8 drop-shadow-2xl mt-2'>
            <p className='text-rose-400 text-2xl'>
              Your Shopping Bag Is Empty.
            </p>
            <HiOutlineEmojiSad className='ml-1 text-2xl text-rose-400 relative top-0.5' />
          </div>
        </section>
      )}

      {hasProducts && (
        <>
          <ul className='border-gray-200 py-4 px-8'>
            {products.map((product) => (
              <CartItem
                key={product.productId || product.snapshot.id}
                product={product}
              />
            ))}
          </ul>
          <div className='rounded-s-sm shadow-lg flex flex-col bg-slate-100 pt-5'>
            <p className='tracking-wide text-3xl text-center font-bold pb-6 pt-2 relative -left-3.5'>
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
