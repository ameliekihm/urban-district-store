import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button
      className='bg-brand py-1 px-3 rounded-sm 
      hover:brightness-110 
      transition-all duration-300 hover:scale-105
       text-gray-100 text-lg'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
