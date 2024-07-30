
import { SignIn, useUser } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Signin() {

  const {user, isLoaded, isSignedIn} = useUser();
  const navigate = useNavigate();

  if(isSignedIn && isLoaded){
    return navigate('/dashboard');
  }

  return (
    <div className='flex justify-center my-16 items-center'>
      <SignIn/>
    </div>
  )
}

export default Signin