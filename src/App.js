import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar />
        <Outlet />
        <p className='flex justify-center py-4'>
          © 2024 Kaylee All Rights Reserved
        </p>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
