import React from 'react'

function Experience({resumeinfo}) {

  const themeColor='#2F4BFF'
  return (
    <div className='my-6'>
         <h2
         style={{
            color: resumeinfo?.themeColor || themeColor
         }}
          className='text-center font-bold text-sm mb-2'>Professional Experience</h2>
          <hr style={{
            borderColor: resumeinfo?.themeColor || themeColor
          }} />
          {resumeinfo?.experience?.map((experience, i) => (
            <div key={i} className='my-5'>
                <h2 className='text-sm font-bold' 
                 style={{
                    color: resumeinfo?.themeColor || themeColor
                 }}
                >{experience?.title}</h2>
                <h2 className='text-xs flex justify-between'>{experience?.companyName}, {experience?.city}, {experience?.state}
                    <span>{experience?.startDate} To {experience?.currentlyWorking?'Present':experience.endDate}</span>
                </h2>
                <div className='text-xs my-2' dangerouslySetInnerHTML={{__html: experience?.workSummery}}/>
            </div>
          ))}
    </div>
  )
}

export default Experience