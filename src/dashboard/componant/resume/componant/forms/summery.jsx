import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Appcontext } from '@/context/appcontext';
import React, { useContext, useEffect, useState } from 'react';
import { Updateresume } from './../../../../../../service/globalapi';
import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { AichatSession } from './../../../../../../service/aimodal';

const prompt = 'Job Title: {jobTitle}, Depends on job title give me summary for my resume within 4-5 lines in JSON format with fields experienceLevel and summary with Experience level for Fresher, Mid-level, Experienced';

function Summery({ enablenext }) {
  const { resumeinfo, setresumeinfo } = useContext(Appcontext);
  const [summery, setsummery] = useState(resumeinfo?.summery || '');
  const [loading, setloading] = useState(false);
  const [ailoading, setailoading] = useState(false);
  const params = useParams();
  const [aisummery, setaisummery] = useState([]);

  useEffect(() => {
    if (summery) {
      setresumeinfo({
        ...resumeinfo,
        summery: summery
      });
    }
  }, [summery]);

  const GeneratesummeryfromAi = async () => {
    setailoading(true);
    try {
      const PROMPT = prompt.replace('{jobTitle}', resumeinfo?.jobTitle);
      const result = await AichatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();

      console.log('AI Response:', responseText);

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(`[${responseText}]`);
        console.log('Parsed Response:', parsedResponse);
        setaisummery(parsedResponse);
      } catch (error) {
        console.error('Failed to parse response as JSON:', error);
        toast.error('Invalid response from AI');
      }
    } catch (error) {
      console.error('Error generating summary from AI:', error);
      toast.error('Failed to generate summary from AI');
    } finally {
      setailoading(false);
    }
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    setloading(true);
    const data = {
      data: {
        summery: summery
      }
    };

    Updateresume(params?.resumeid, data)
      .then((response) => {
        enablenext(true);
        toast.success('Details Saved');
      })
      .catch((error) => {
        console.error('Failed to save details:', error);
        toast.error('Failed to save details');
      })
      .finally(() => {
        setloading(false);
      });
  };

  const handleSummaryClick = (summary) => {
    setsummery(summary);
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary Details</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={handelsubmit}>
          <div className='flex justify-between items-center'>
            <label>Add Summary</label>
            <Button onClick={GeneratesummeryfromAi} type='button' variant='outline' size='sm' className='border-primary text-primary flex gap-2'>
              {ailoading ? <LoaderCircle className='animate-spin'/> : <><Brain className='h-4 w-4' /> Generate from AI</>}
            </Button>
          </div>
          <Textarea
            required
            value={summery}
            onChange={(e) => setsummery(e.target.value)}
            className='mt-5'
          />
          <div className='mt-2 flex justify-end'>
            <Button type='submit' disabled={loading}>{loading ? <LoaderCircle className='animate-spin' /> : 'Save'}</Button>
          </div>
        </form>
      </div>

      {aisummery.length > 0 && (
        <div className='mt-5'>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {aisummery.map((item, i) => (
            <div key={i} className='border p-3 my-2 rounded-lg cursor-pointer' onClick={() => handleSummaryClick(item?.summary)}>
              <h2 className='font-bold my-1 text-primary'>Level: {item?.experienceLevel}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
