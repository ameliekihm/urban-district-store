import { Link } from 'react-router-dom';
import { TfiPencil } from 'react-icons/tfi';
import { PiHeartbeatBold } from 'react-icons/pi';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-200 p-2'>
      <Link
        to='/'
        className='flex items-center text-4xl text-brand font-semibold'
      >
        <PiHeartbeatBold className='mr-1' />
        <h1>URBAN DISTRICT</h1>
      </Link>

      <nav className='flex items-center gap-5 font-semibold text-lg text-gray-700'>
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
            <CartStatus />
          </Link>
        )}

        {user && user.isAdmin && (
          <Link
            to='/products/new'
            className='text-3xl transition-all duration-300 hover:scale-110'
          >
            <TfiPencil />
          </Link>
        )}

        {user ? (
          <div className='flex items-center gap-3'>
            {user.picture && (
              <img
                src={user.picture}
                alt='Profile'
                className='w-9 h-9 rounded-full border'
              />
            )}
            <span className='text-gray-700'>{user.name}</span>
            <Button text='Logout' onClick={logout} />
          </div>
        ) : (
          <Button text='Login' onClick={login} />
        )}
      </nav>
    </header>
  );
}
