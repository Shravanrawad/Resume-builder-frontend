import React from 'react'

function Summerypreview({resumeinfo}) {
  return (
    <p className='text-xs'>
       {resumeinfo?.summery}
    </p>
  )
}

export default Summerypreview