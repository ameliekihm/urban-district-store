import React from 'react';
import { Link } from 'react-router-dom';
import { TfiPencil } from 'react-icons/tfi';
import { HiMiniShoppingBag } from 'react-icons/hi2';

export default function Navbar() {
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link
        to='/'
        className='flex items-center text-4xl text-brand font-semibold'
      >
        <HiMiniShoppingBag />
        <h1>Neon District</h1>
      </Link>
      <nav className='flex items-center gap-5 font-semibold text-xl'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new' className='text-2xl'>
          <TfiPencil />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}
