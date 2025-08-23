import React from 'react';

export default function User({ user }) {
  return (
    <div className='flex items-center gap-2'>
      <img
        src={user.picture}
        alt={user.name}
        className='w-8 h-8 rounded-full'
      />
      <span className='font-semibold'>{user.name}</span>
    </div>
  );
}
