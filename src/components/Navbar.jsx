import { Link } from 'react-router-dom';
import { TfiPencil } from 'react-icons/tfi';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  return (
    <header className='flex justify-between border-b border-gray-200 p-2'>
      <Link
        to='/'
        className='flex items-center text-4xl text-brand font-semibold'
      >
        <HiMiniShoppingBag />
        <h1>URBAN DISTRICT</h1>
      </Link>
      <nav className='flex items-center gap-5 font-semibold text-lg text-gray-700 '>
        <Link
          className='transition-all duration-300 hover:scale-110'
          to='/products'
        >
          Products
        </Link>
        {user && (
          <Link
            className='transition-all duration-300 hover:scale-110'
            to='/carts'
          >
            Carts
          </Link>
        )}
        {user && user.isAdmin && (
          <Link
            to='/products/new'
            className='text-2xl transition-all duration-300 hover:scale-110'
          >
            <TfiPencil />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={login} />}
        {user && <Button text={'Logout'} onClick={logout} />}
      </nav>
    </header>
  );
}
