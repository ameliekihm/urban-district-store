import React from 'react';
import { Link } from 'react-router-dom';
import { TfiPencil } from 'react-icons/tfi';
import { HiMiniShoppingBag } from 'react-icons/hi2';

export default function Navbar() {
  return (
    <header>
      <Link to='/'>
        <HiMiniShoppingBag />
        <h1>Neon District</h1>
      </Link>
      <nav>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new'>
          <TfiPencil />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}
