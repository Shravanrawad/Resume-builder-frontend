import Header from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { Appcontext } from '@/context/appcontext'
import Resumepreview from '@/dashboard/componant/resume/componant/resumepreview'
import React, { useEffect, useState } from 'react'
import { Getresumebyid } from './../../../../service/globalapi'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'
import Themecolor from '@/dashboard/componant/resume/componant/themecolor'

function View() {
    const [resumeinfo, setresumeinfo] = useState();
    const [isDownloading, setIsDownloading] = useState(false);
    const params = useParams();

    useEffect(() => {
        Getresumeinfo();
    }, [params])

    const Getresumeinfo = () => {
        Getresumebyid(params?.resumeid).then(res => {
            console.log('this is view data', res.data.data)
            setresumeinfo(res.data.data.attributes)
            console.log(resumeinfo)
        })
    }

    const handeldownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            window.print();
            setIsDownloading(false);
        }, 100);
    }

    return (
        <Appcontext.Provider value={{ resumeinfo, setresumeinfo }}>
            <div id='notuse' className={isDownloading ? 'hidden' : ''}>
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-xl font-medium'>Your Resume Is Ready !</h2>
                    <p className='text-center text-gray-400'>Now You Can Download And Share Your Resume</p>

                    <div className='flex justify-between items-center mt-6 mb-6'>

                         <div className='flex items-center gap-2'>
                         <Themecolor/>
                         <Button onClick={handeldownload}>Download</Button>
                         </div>

                        <RWebShare
                            data={{
                                text: "Like humans, flamingos make friends for life",
                                url: import.meta.env.VITE_BASE_URL+'/my-resume/'+params?.resumeid+'/view',
                                title: resumeinfo?.firstName + ' ' + resumeinfo?. lastName + ' resume'
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>

                    </div>

                </div>
            </div>
            <div>
                <div id='printarea' className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <Resumepreview resumeinfo={resumeinfo} />
                </div>
            </div>
        </Appcontext.Provider>
    )
}

export default View;
