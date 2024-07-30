import { Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { createNewResume } from './../../../service/globalapi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function Addresume({refreshData}) {
  const [opendialog, setopendialog] = useState(false);
  const [resumetitle, setresumetitle] = useState('');
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const oncreate = () => {
    if (!resumetitle.trim()) {
      alert('Please enter a title for your resume.');
      return;
    }

    setloading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumetitle,
        resumeid: uuid,
        UserEmail: user?.primaryEmailAddress?.emailAddress,
        UserName: user?.fullName,
      },
    };

    createNewResume(data).then(
      (response) => {
        console.log(response);
        if (response) {
          setloading(false);
          // navigate(`/dashboard/resume/${response.data.data.resumeid}/edit`);
          refreshData();
          setopendialog(false);
        }
      },
      (error) => {
        setloading(false);
        console.error('Failed to create new resume:', error);
      }
    );
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all duration-500 hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setopendialog(true)}
      >
        <PlusSquare className="w-text-gray-600" />
      </div>
      <Dialog open={opendialog} onOpenChange={setopendialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p className="text-gray-600">Add a title for your new resume</p>
              <Input
                value={resumetitle}
                onChange={(e) => setresumetitle(e.target.value)}
                className="my-2"
                placeholder="Ex. Web Developer Resume"
              />
            </DialogDescription>
            <div className="flex justify-end gap-5 mt-4">
              <Button onClick={() => setopendialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumetitle.trim() || loading}
                onClick={oncreate}
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Create'}
              </Button>
            </div>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Addresume;
