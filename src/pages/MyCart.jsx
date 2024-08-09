import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { FaSquarePlus } from 'react-icons/fa6';
import { FaEquals } from 'react-icons/fa';

const SHIPPING = 7.5;

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
    <section>
      <p>Shopping Bag</p>
      {!hasProducts && <p>Your Shopping Bag Is Empty.</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div>
            <PriceCard text='Subtotal' price={totalPrice} />
            <FaSquarePlus />
            <PriceCard text='Standard Shipping' price={SHIPPING} />
            <FaEquals />
            <PriceCard text='Estimated Total' price={totalPrice + SHIPPING} />
          </div>
        </>
      )}
    </section>
  );
}
