import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Formsection from '../../componant/formsection';
import Resumepreview from '../../componant/resumepreview';
import { Appcontext } from '@/context/appcontext';
import dummy from '@/data/dummy';
import { Getresumebyid } from './../../../../../../service/globalapi';

function Edit() {
    const params = useParams();
    const [resumeinfo, setresumeinfo] = useState({});
    const [themeColors, setThemecolor] = useState('#FF33A1')

    useEffect(() => {
        Getresumeinfo();
    }, [params]);

    const Getresumeinfo = () => {
        Getresumebyid(params?.resumeid).then(response => {
            console.log(response.data.data.attributes)
            setresumeinfo(response.data.data.attributes);
        })
    }

    return (
        <Appcontext.Provider value={{ resumeinfo, setresumeinfo , themeColors, setThemecolor }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                <Formsection />
                <Resumepreview />
            </div>
        </Appcontext.Provider>
    );
}

export default Edit;
