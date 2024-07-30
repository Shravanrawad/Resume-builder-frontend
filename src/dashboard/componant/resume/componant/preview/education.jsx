import React from 'react'

function Education({resumeinfo}) {

    const themeColor='#2F4BFF'
    return (
        <div>
            <h2
                style={{
                    color: resumeinfo?.themeColor || themeColor
                }}
                className='text-center font-bold text-sm mb-2'>Education</h2>
            <hr style={{
                borderColor: resumeinfo?.themeColor || themeColor
            }} />
            {resumeinfo?.education?.map((education, i) => (
                <div key={i} className='my-5'>
                     <h2 className='text-sm font-bold'
                     style={{
                        color: resumeinfo?.themeColor || themeColor
                     }}
                     >{education?.universityName}</h2>
                     <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major} 
                        <span>{education?.startDate}  -  {education?.endDate}</span>
                     </h2>
                     <p className='text-xs my-2'>{education?.description}</p>
                </div> 
            ))}
        </div>
    )
}

export default Education