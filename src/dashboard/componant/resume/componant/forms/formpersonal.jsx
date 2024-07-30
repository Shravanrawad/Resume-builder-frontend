import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Appcontext } from '@/context/appcontext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Updateresume } from './../../../../../../service/globalapi';
import { toast } from 'react-toastify';

function Formpersonal({ enablenext }) {
  const { resumeinfo, setresumeinfo } = useContext(Appcontext);
  const [loading, setloading] = useState(false)
  const params = useParams();
  const [formdata, setformdata] = useState({});

  useEffect(() => {
    setformdata(resumeinfo);
  }, [resumeinfo]);

  useEffect(() => {
    console.log("Params:", params);
    console.log("Initial form data:", formdata);
  }, [params, formdata]);

  const handleInput = (e) => {
    enablenext(false);
    const { name, value } = e.target;

    setformdata({
      ...formdata,
      [name]: value,
    });

    setresumeinfo({
      ...resumeinfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const data = {
      data: formdata,
    };

    try {
      const response = await Updateresume(params?.resumeid, data);
      enablenext(true);
      toast.success('Details Saved');
    } catch (error) {
      toast.error('Failed to save details');
    } finally {
      setloading(false);
    }
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Details</h2>
      <p>Get Started With the basic information</p>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='text-sm'>First Name</label>
            <Input
              name='firstName'
              value={formdata?.firstName || ''}
              required
              onChange={handleInput}
            />
          </div>

          <div>
            <label className='text-sm'>Last Name</label>
            <Input
              name='lastName'
              value={formdata?.lastName || ''}
              required
              onChange={handleInput}
            />
          </div>

          <div className='col-span-2'>
            <label className='text-sm'>Job Title</label>
            <Input
              name='jobTitle'
              value={formdata?.jobTitle || ''}
              required
              onChange={handleInput}
            />
          </div>

          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input
              name='address'
              value={formdata?.address || ''}
              required
              onChange={handleInput}
            />
          </div>

          <div>
            <label className='text-sm'>Phone</label>
            <Input
              name='phone'
              value={formdata?.phone || ''}
              required
              onChange={handleInput}
            />
          </div>

          <div>
            <label className='text-sm'>Email</label>
            <Input
              name='email'
              value={formdata?.email || ''}
              required
              onChange={handleInput}
            />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type='submit' disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Formpersonal;
