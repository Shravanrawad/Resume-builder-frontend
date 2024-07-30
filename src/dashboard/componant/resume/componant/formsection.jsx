import React, { useState } from 'react'
import Formpersonal from './forms/formpersonal'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGridIcon } from 'lucide-react'
import Summery from './forms/summery';
import Exprerience from './forms/exprerience';
import Education from './forms/education';
import Skills from './forms/skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import View from '@/my-resume/[resumeid]/view/view';
import Themecolor from './themecolor';


function Formsection() {

  const [activeindex, setactiveindex] = useState(1);
  const [enablenext, setenablenext] = useState(false);
  const params = useParams();

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-5 items-center justify-center'>
        <Link to={'/dashboard'}>
        <Button><Home/></Button>
        </Link>
        {/* <Themecolor/> */}
        </div>
        <div className='flex gap-2'>
          {activeindex > 1 && <Button size='sm' onClick={() => setactiveindex(activeindex - 1)}> <ArrowLeft/> </Button> }
          <Button disabled={!enablenext } className='flex gap-2' size='sm' onClick={() => setactiveindex(activeindex + 1)}>Next <ArrowRight/></Button>
        </div>
      </div>

      {activeindex == 1 ?  <Formpersonal enablenext={(v) => setenablenext(v)} /> : null}
      {activeindex == 2 ?  <Summery enablenext={(v) => setenablenext(v)}/> : null} 
      {activeindex == 3 ?  <Exprerience enablenext={(v) => setenablenext(v)}/> : null}
      {activeindex == 4 ?  <Education enablenext={(v) => setenablenext(v)}/> : null}
      {activeindex == 5 ?  <Skills enablenext={(v) => setenablenext(v)}/> : null}
      {activeindex == 6 ?  <Navigate to={'/my-resume/'+params?.resumeid+'/view'}/> : null}  

    </div>
  )
}

export default Formsection