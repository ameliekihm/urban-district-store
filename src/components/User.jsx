import React from 'react';

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className='flex items-center'>
      <img
        className='w-10 h-10 rounded-full mr-1'
        src={photoURL}
        alt={displayName}
      />

      <span className='hidden md:block text-brand'>{displayName}</span>
    </div>
  );
}
