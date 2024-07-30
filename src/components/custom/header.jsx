import React from 'react'
import { Button } from '../ui/button'
import { Link, Navigate } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {

    const { user, isSignedIn } = useUser();
    
    return (
        <div className='p-3 px-5 flex justify-between items-center shadow-md'>
             <div className='flex items-center justify-center gap-2'>
               <img src="/logo.svg" width={70} height={70} alt="" />
               <h2 className='font-semibold'>ProResume</h2>
             </div>

            {isSignedIn ?
                <div className='flex items-center gap-2'>
                    <Link to={'/dashboard'}>
                    <Button variant='outline'>Dashboard</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            }
        </div>
    )
}

export default Header
