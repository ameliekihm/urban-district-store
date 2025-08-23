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

        {user && (
          <div className='flex items-center gap-2'>
            <img
              src={user.picture}
              alt={user.name}
              className='w-8 h-8 rounded-full border'
            />
            <span className='text-gray-800'>{user.name}</span>
          </div>
        )}

        {!user && <Button text={'Login'} onClick={login} />}
        {user && <Button text={'Logout'} onClick={logout} />}
      </nav>
    </header>
  );
}
