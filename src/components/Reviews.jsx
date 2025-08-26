import React from 'react';
import useReviews from '../hooks/useReviews';

export default function Reviews() {
  const { getRandomReviews } = useReviews();
  const randomReviews = getRandomReviews(3);

  return (
    <section className='mt-6'>
      <h3 className='text-xl font-bold mb-4'>Customer Reviews</h3>
      {randomReviews.map((r) => (
        <div
          key={r.id}
          className='border rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition'
        >
          <div className='flex justify-between items-center mb-2'>
            <span className='font-semibold text-gray-800'>{r.author}</span>
            <span className='text-sm text-gray-400'>{r.date}</span>
          </div>
          <div className='flex items-center mb-2'>
            {'💚'.repeat(Number(r.rating))}
          </div>
          <p className='text-gray-700'>{r.review}</p>
        </div>
      ))}
    </section>
  );
}
