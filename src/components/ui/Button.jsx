import React from 'react';

export default function Button({ text, className, icon, onClick }) {
  return (
    <button
      className={`bg-brand py-1 px-3 rounded-sm 
      hover:brightness-110 flex items-center justify-center
      transition-all duration-300 hover:scale-105
       text-gray-100 text-lg ${className}`}
      onClick={onClick}
    >
      <p className='text-center'>{text}</p>
      {icon && <span className='ml-6 py-3 text-3xl text-pink-400'>{icon}</span>}
    </button>
  );
}
