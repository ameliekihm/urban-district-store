import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import { AiOutlineCopyright } from 'react-icons/ai';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar />
        <Outlet />
        <div className='flex justify-center items-center py-4 '>
          <AiOutlineCopyright className='mr-1 relative top-[-1px]' />
          <p className='font-stix'>
            2024 Urban District - Amelie All Rights Reserved
          </p>
        </div>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
