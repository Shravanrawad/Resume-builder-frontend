import { useEffect } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/custom/header';
import { LoaderCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        navigate('/dashboard');
      } else {
        navigate('/auth/sign-in');
      }
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return <div className='fixed flex justify-center items-center w-full h-full'><LoaderCircle className='animate-spin h-10 w-10'/></div>; 
  }

  return (
    <>
      <Header/>
      <Outlet />
      <ToastContainer position='bottom-right'/>
    </>
  );
}

export default App;
