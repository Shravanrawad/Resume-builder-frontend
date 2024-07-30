import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Appcontext } from '@/context/appcontext';
import { useParams } from 'react-router-dom';
import { Updateresume } from './../../../../../../service/globalapi';
import { toast } from 'react-toastify';

const formField = {
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
};

function Education() {
    const [loading, setloading] = useState(false);
    const { resumeinfo, setresumeinfo } = useContext(Appcontext);
    const params = useParams();
    
    const initialEducationList = resumeinfo?.education?.length ? resumeinfo.education : [formField];
    const [educationlist, seteducationlist] = useState(initialEducationList);

    const handelchange = (e, index) => {
        const newdata = [...educationlist];
        const { name, value } = e.target;
        newdata[index][name] = value;
        seteducationlist(newdata);
    };

    useEffect(() => {
        setresumeinfo({
            ...resumeinfo,
            education: educationlist
        });
    }, [educationlist]);

    const Addmoreeducation = () => {
        seteducationlist([...educationlist, { ...formField }]);
    };

    const Removeeducation = () => {
        seteducationlist(educationlist.slice(0, -1));
    };

    const onSave = async (e) => {
        e.preventDefault();
        setloading(true);
        const data = { education: educationlist };

        Updateresume(params?.resumeid, {data})
            .then(response => {
                toast.success('Details saved successfully');
                setloading(false);
            })
            .catch((error) => {
                console.error("Update Error:", error.response ? error.response.data : error.message);
                toast.error('Failed to save details');
                setloading(false);
            });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your Educational Details</p>

            <div>
                {educationlist.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div className='col-span-2'>
                            <label>University Name</label>
                            <Input name='universityName' value={item.universityName} onChange={(e) => handelchange(e, index)} />
                        </div>

                        <div>
                            <label>Degree</label>
                            <Input name='degree' value={item.degree} onChange={(e) => handelchange(e, index)} />
                        </div>

                        <div>
                            <label>Major</label>
                            <Input name='major' value={item.major} onChange={(e) => handelchange(e, index)} />
                        </div>

                        <div>
                            <label>Start Date</label>
                            <Input type='date' name='startDate' value={item.startDate} onChange={(e) => handelchange(e, index)} />
                        </div>

                        <div>
                            <label>End Date</label>
                            <Input type='date' name='endDate' value={item.endDate} onChange={(e) => handelchange(e, index)} />
                        </div>

                        <div className='col-span-2'>
                            <label>Description</label>
                            <Textarea name='description' value={item.description} onChange={(e) => handelchange(e, index)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between mt-2'>
                <div className='flex gap-2'>
                    <Button onClick={Addmoreeducation} variant='outline' className='text-primary'>+ Add More Education</Button>
                    <Button onClick={Removeeducation} variant='outline' className='text-primary'>- Remove</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Education;
