import { File, LoaderCircle, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Deleteresume } from './../../../service/globalapi'
import { toast } from 'react-toastify'

function Resumeitem({ resume,  refreshData }) {

    const navigate = useNavigate();
    const [openalert, setopenalert] = useState(false);
    const [deleteloading , setdeleteloading] = useState(false);

    const handledelete = () => {
        setdeleteloading(true)
        Deleteresume(resume.id).then(rep => {
            toast.success('Resume Deleted!')
            refreshData();
            setdeleteloading(false)
        },(error) => {
            setdeleteloading(false)
        })
    }

    return (
        <>
            <div>
                <Link to={'/dashboard/resume/' + resume.id + '/edit'}>
                    <div className='p-14 shadow-md bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex items-center justify-center h-[280px] border-t-4 rounded-tl-lg rounded-tr-lg transition-all duration-500'>
                        <File />
                    </div>
                </Link>
                <div className='flex justify-between items-center bg-primary rounded-br-lg rounded-bl-lg p-2'>
                    <h2 className='text-sm'>{resume.attributes.title}</h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreVertical className='h-4 w-4 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => navigate('/dashboard/resume/' + resume.id + '/edit')}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/my-resume/' + resume.id + '/view')}>View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/my-resume/' + resume.id + '/view')}>Download</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setopenalert(true)} className='text-red-600'>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog open={openalert}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your resume
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setopenalert(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction disabled={deleteloading} onClick={handledelete}>{deleteloading ? <LoaderCircle className='animate-spin'/> : 'Delete'}</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </div>
        </>
    )
}


export default Resumeitem