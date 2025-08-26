import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';
import useReviews from '../hooks/useReviews';

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

  const handleClick = () => {
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

  const { reviews, getRandomReviews } = useReviews();
  const displayedReviews = getRandomReviews(4);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const sizeStats = React.useMemo(() => {
    const trueSize = Math.floor(Math.random() * 16) + 80;
    const remaining = 100 - trueSize;

    const small = Math.floor(Math.random() * (remaining + 1));
    const big = remaining - small;

    return { small, true: trueSize, big };
  }, [id]);

  const getPercentage = (value) => `${value}`;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push('⭐');
      else if (i - rating < 1) stars.push('⭐️');
      else stars.push('☆');
    }
    return stars.join('');
  };

  return (
    <>
      <section className='flex flex-col lg:flex-row p-4 gap-x-20 border-b justify-center items-start'>
        <div className='w-full basis-7/12 flex flex-col items-center px-2'>
          <img
            className='w-full mx-auto max-w-md pt-6 pb-4'
            src={image}
            alt={title}
          />

          <div className='w-full max-w-md mt-4 bg-white p-4 rounded shadow'>
            <div className='space-y-2'>
              <div className='flex items-center gap-3'>
                <span className='w-24 text-sm text-gray-700'>Runs small</span>
                <div className='flex-1 bg-gray-200 h-2 rounded'>
                  <div
                    className='bg-black h-2 rounded'
                    style={{ width: `${getPercentage(sizeStats.small)}%` }}
                  ></div>
                </div>
                <span className='w-8 text-sm text-gray-700'>
                  {getPercentage(sizeStats.small)}%
                </span>
              </div>

              <div className='flex items-center gap-3'>
                <span className='w-24 text-sm text-gray-700'>True to size</span>
                <div className='flex-1 bg-gray-200 h-2 rounded'>
                  <div
                    className='bg-black h-2 rounded'
                    style={{ width: `${getPercentage(sizeStats.true)}%` }}
                  ></div>
                </div>
                <span className='w-8 text-sm text-gray-700'>
                  {getPercentage(sizeStats.true)}%
                </span>
              </div>

              <div className='flex items-center gap-3'>
                <span className='w-24 text-sm text-gray-700'>Runs big</span>
                <div className='flex-1 bg-gray-200 h-2 rounded'>
                  <div
                    className='bg-black h-2 rounded'
                    style={{ width: `${getPercentage(sizeStats.big)}%` }}
                  ></div>
                </div>
                <span className='w-8 text-sm text-gray-700'>
                  {getPercentage(sizeStats.big)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full basis-5/12 flex flex-col p-2 mr-8'>
          <h2 className='text-3xl font-bold py-2'>{title}</h2>
          <p className='text-2xl font-semibold py-2 border-b border-gray-400'>
            {`US $${price}.00`}
          </p>
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

          <section className='mt-8'>
            <h3 className='text-2xl font-bold py-2 text-center'>
              Customer Reviews
            </h3>
            {displayedReviews.map((review, index) => (
              <div key={index} className='mb-4 rounded-sm shadow-sm p-2 border'>
                <p className='text-lg font-semibold'>{review.author}</p>
                <p className='text-sm text-gray-600'>{review.date}</p>
                <p className='text-lg text-pink-400'>
                  {'★'.repeat(review.rating)}
                </p>
                <p className='text-lg'>{review.review}</p>
              </div>
            ))}
          </section>
        </div>
      </section>
    </>
  );
}
