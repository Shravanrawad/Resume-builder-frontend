import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Appcontext } from '@/context/appcontext';
import { Updateresume } from './../../../../../../service/globalapi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const formField = {
  name: '',
  rating: 0
};

function Skills() {
  const [loading, setloading] = useState(false);
  const { resumeinfo, setresumeinfo } = useContext(Appcontext);
  const params = useParams();

  const initialSkillsList = resumeinfo?.skills?.length ? resumeinfo.skills : [formField];
  const [skillslist, setskillslist] = useState(initialSkillsList);

  const handlechange = (index, name, value) => {
    const newdata = [...skillslist];
    newdata[index][name] = value;
    setskillslist(newdata);
  };

  useEffect(() => {
    setresumeinfo({
      ...resumeinfo,
      skills : skillslist
    });
  }, [skillslist]);

  const Addmoreskills = () => {
    setskillslist([...skillslist, { ...formField }]);
  };

  const Removeskills = () => {
    setskillslist(skillslist.slice(0, -1));
  };

  const onSave = () => {
    setloading(true);
    const data = { skills: skillslist };
    Updateresume(params?.resumeid, {data})
      .then(res => {
        console.log(res);
        setloading(false);
        toast.success('Details Saved');
      })
      .catch((error) => {
        setloading(false);
        toast.error('Error, try again');
      });
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your Top Key Skills</p>

      <div>
        {skillslist?.map((item, index) => (
          <div key={index} className='flex items-center justify-between border rounded-lg p-3 mt-3'>
            <div>
              <label className='text-xs'>Skill Name</label>
              <Input className='w-full' value={item.name} onChange={(e) => handlechange(index, 'name', e.target.value)} />
            </div>
            <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v) => handlechange(index, 'rating', v)} />
          </div>
        ))}
      </div>
      <div className='flex justify-between mt-2'>
        <div className='flex gap-2'>
          <Button onClick={Addmoreskills} variant='outline' className='text-primary'>+ Add More Skills</Button>
          <Button onClick={Removeskills} variant='outline' className='text-primary'>- Remove</Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Skills;
