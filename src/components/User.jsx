import React from 'react';

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className='flex items-center shrink-0 transition-all duration-300 hover:scale-110'>
      <img
        className='w-10 h-10 rounded-full mr-1'
        src={photoURL}
        alt={displayName}
      />

      <span className='hidden md:block text-black border-b-2 border-brand'>
        {displayName}
      </span>
    </div>
  );
}
