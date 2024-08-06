import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TfiPencil } from 'react-icons/tfi';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';

export default function Navbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <header className='flex justify-between border-b border-gray-200 p-2'>
      <Link
        to='/'
        className='flex items-center text-4xl text-brand font-semibold'
      >
        <HiMiniShoppingBag />
        <h1>Neon District</h1>
      </Link>
      <nav className='flex items-center gap-5 font-semibold text-lg'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new' className='text-2xl'>
          <TfiPencil />
        </Link>
        {user && <User user={user} />}
        {!user && <button onClick={login}>Login</button>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
}
