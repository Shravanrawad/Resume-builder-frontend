import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import Richtexteditor from '../richtexteditor';
import { Appcontext } from '@/context/appcontext';
import { LoaderCircle } from 'lucide-react';
import { Updateresume } from './../../../../../../service/globalapi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: ''
};

function Experience() {
  const { resumeinfo, setresumeinfo } = useContext(Appcontext);
  const [experiencelist, setexperiencelist] = useState(resumeinfo?.experience || [formField]);
  const [loading, setloading] = useState(false);
  const params = useParams();

  const handelchange = (i, e) => {
    const newEntries = [...experiencelist];
    const { name, value } = e.target;
    newEntries[i][name] = value;
    setexperiencelist(newEntries);
  };

  const Addmoreexperience = () => {
    setexperiencelist([...experiencelist, { ...formField }]);
  };

  const Removeexperience = () => {
    setexperiencelist(experiencelist.slice(0, -1));
  };

  const handelhandleeditor = (content, i) => {
    const newEntries = [...experiencelist];
    newEntries[i].workSummery = content;
    setexperiencelist(newEntries);
  };

  useEffect(() => {
    setresumeinfo((prev) => ({
      ...prev,
      experience: experiencelist
    }));
  }, [experiencelist, setresumeinfo]);

  const Savedetails = (e) => {
    e.preventDefault();
    setloading(true);
    const data = { experience: experiencelist };

    Updateresume(params?.resumeid, {data})
      .then((response) => {
        toast.success('Details saved successfully');
        setloading(false);
      })
      .catch((error) => {
        console.error("Update Error:", error.response ? error.response.data : error.message);
        toast.error('Failed to save, try again');
        setloading(false);
      });
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous job experience</p>
        <div>
          {experiencelist.map((item, i) => (
            <div key={i}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input name='title' value={item.title} onChange={(e) => handelchange(i, e)} />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input name='companyName' value={item.companyName} onChange={(e) => handelchange(i, e)} />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input name='city' value={item.city} onChange={(e) => handelchange(i, e)} />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input name='state' value={item.state} onChange={(e) => handelchange(i, e)} />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input type='date' name='startDate' value={item.startDate} onChange={(e) => handelchange(i, e)} />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input type='date' name='endDate' value={item.endDate} onChange={(e) => handelchange(i, e)} />
                </div>
                <div className='col-span-2'>
                  <Richtexteditor 
                    index={i} 
                    initialValue={item.workSummery} 
                    onRichTexteditorchange={(content) => handelhandleeditor(content, i)} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between mt-2'>
          <div className='flex gap-2'>
            <Button onClick={Addmoreexperience} variant='outline' className='text-primary'>+ Add More Experience</Button>
            <Button onClick={Removeexperience} variant='outline' className='text-primary'>- Remove</Button>
          </div>
          <Button onClick={Savedetails} disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
