import { Button } from '@/components/ui/button';
import { Appcontext } from '@/context/appcontext';
import React, { useContext, useEffect, useState } from 'react';

function Skills() {
  const { resumeinfo } = useContext(Appcontext);
  const themeColor = resumeinfo?.themeColor || '#2F4BFF';
  
  return (
    <div>
      <h2
        style={{ color: themeColor }}
        className='text-center font-bold text-sm mb-2'
      >
        Skills
      </h2>
      <hr style={{ borderColor: themeColor }} />

      <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeinfo?.skills?.map((skill, i) => (
          <div key={i} className='flex items-center justify-between'>
            <h2 className='text-xs'>{skill.name}</h2>
            <div className='h-2 w-[120px] bg-gray-700 print-skill'>
              <div
                className='h-2'
                style={{
                  backgroundColor: themeColor,
                  width: skill?.rating * 20 + '%'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
