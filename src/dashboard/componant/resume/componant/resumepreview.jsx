import { Appcontext } from '@/context/appcontext';
import React, { useContext } from 'react'
import Personaldetails from './preview/personaldetails';
import Summerypreview from './preview/summerypreview';
import Experience from './preview/experience';
import Education from './preview/education';
import Skills from './preview/skills';

function Resumepreview() {

  const { resumeinfo, setresumeinfo} = useContext(Appcontext);
  const themeColor='#335AFF' 
  
  return (
    <div className='shadow-lg h-full p-3 md:p-10 border-t-[20px]'
    style={{
      borderColor: resumeinfo?.themeColor || themeColor
    }}
    >
      <Personaldetails resumeinfo={resumeinfo}/>
      <Summerypreview resumeinfo={resumeinfo}/>
      <Experience resumeinfo={resumeinfo}/>
      <Education resumeinfo={resumeinfo}/>
      <Skills resumeinfo={resumeinfo}/>
    </div>
  )
}

export default Resumepreview