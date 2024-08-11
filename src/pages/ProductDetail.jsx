import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const optionsArray =
    typeof options === 'string' ? options.split(',') : options;

  const [selected, setSelected] = useState(options && optionsArray[0]);

  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('Item has been added to the cart.');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          setSuccess(null);
        }, 2000);
      },
    });
  };

  const reviews = [
    {
      nickname: 'Hamgee',
      date: 'August 2024',
      rating: '💚💚💚💚💚',
      comment: 'This product is amazing! Highly recommend.',
    },
    {
      nickname: 'Dustina',
      date: 'July 2024',
      rating: '💚💚💚💚',
      comment: `Good quality, but it's a bit big for me.`,
    },
    {
      nickname: 'Pagillo',
      date: 'December 2023',
      rating: '💚💚💚💚💚',
      comment: 'I bought it for my wife, and she loves it.',
    },
  ];
  return (
    <>
      <section className='flex flex-col lg:flex-row p-4 gap-x-20 border-b justify-center items-start'>
        <img
          className='w-full mx-auto max-w-md pt-6 pb-4 basis-7/12 px-2'
          src={image}
          alt={title}
        />
        <div className='w-full basis-5/12 flex flex-col p-2 mr-8'>
          <h2 className='text-3xl font-bold py-2 '>{title}</h2>
          <p className='text-2xl font-semibold py-2 border-b border-gray-400'>{`US $${price}.00`}</p>
          <p className='py-4 text-lg text-gray-500'>{description}</p>
          <div className='flex items-center'>
            <label className='text-brand font-bold' htmlFor='select'>
              Size:
            </label>
            <select
              id='select'
              className='p-2 m-2 flex-1 border-2 border-dashed border-brand outline-none rounded-md'
              onChange={handleSelect}
              value={selected}
            >
              {optionsArray.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center z-50'>
              <div className='bg-pink-400 p-4 rounded shadow-lg text-xl font-bold text-white'>
                <p>🤍 {success}</p>
              </div>
            </div>
          )}
          <Button text='Add to Bag' onClick={handleClick} />

          <section className='mt-8 hidden lg:block'>
            <h3 className='text-2xl font-bold py-2 text-center '>
              Customer Reviews
            </h3>
            {reviews.map((review, index) => (
              <div key={index} className='mb-4 rounded-s-sm shadow-sm p-2'>
                <p className='text-lg font-semibold'>{review.nickname}</p>
                <p className='text-sm text-gray-600'>{review.date}</p>
                <p className='text-lg'>{review.rating}</p>
                <p className='text-lg'>{review.comment}</p>
              </div>
            ))}
          </section>
        </div>
      </section>
      <section className='px-8 py-2 lg:hidden'>
        <h3 className='text-2xl font-bold py-2 text-center '>
          Customer Reviews
        </h3>
        {reviews.map((review, index) => (
          <div key={index} className='mb-4 rounded-s-sm shadow-sm p-2'>
            <p className='text-lg font-semibold'>{review.nickname}</p>
            <p className='text-sm text-gray-600'>{review.date}</p>
            <p className='text-lg'>{review.rating}</p>
            <p className='text-lg'>{review.comment}</p>
          </div>
        ))}
      </section>
    </>
  );
}
