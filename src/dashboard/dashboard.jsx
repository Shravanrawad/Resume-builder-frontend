import { SignOutButton, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import Addresume from './componant/addresume'
import { GetUserResumes } from './../../service/globalapi';
import Resumeitem from './componant/resumeitem';

function Dashboard() {

  const {user} = useUser();

  const [resumelist, setresumelist] = useState();

  useEffect(() => {
    user && getresumelist();
  }, [user])

  const getresumelist = () => {
    GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(response => {
      setresumelist(response.data.data)
      console.log(response.data.data)
    })
  }

  return (
  <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p className=''>Start creating resume with ai for your next job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <Addresume refreshData={getresumelist}/>
        {resumelist?.length > 0 && resumelist?.map((resume, i) => (
          <Resumeitem resume={resume} key={i}  refreshData={getresumelist}/>
        ))}
      </div>
  </div>
  )
}

export default Dashboard