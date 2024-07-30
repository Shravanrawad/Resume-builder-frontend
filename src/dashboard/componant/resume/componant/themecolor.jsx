import { Appcontext } from '@/context/appcontext';
import React, { useContext, useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Updateresume } from './../../../../../service/globalapi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Themecolor() {
  const { resumeinfo, setresumeinfo } = useContext(Appcontext);
  const [selectedcolor, setselectedcolor] = useState(resumeinfo?.themeColor || "#FF5733");
  const params = useParams();

  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
  ];

  useEffect(() => {
    if (resumeinfo?.themeColor) {
      setselectedcolor(resumeinfo.themeColor);
    }
  }, [resumeinfo]);

  const handelcolor = (item) => {
    setselectedcolor(item);
    setresumeinfo({
      ...resumeinfo,
      themeColor: item
    });
    const data = {
      data: {
        themeColor: item
      }
    }
    Updateresume(params?.resumeid, { data })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error('Failed to update theme color:', error);
        toast.error('Failed to update theme color');
      });
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' size="sm" className='flex gap-2'>
            <LayoutGrid /> Theme
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((item, index) => (
              <div
                key={index}
                className={`h-7 w-7 rounded-full cursor-pointer border hover:border-black ${selectedcolor === item ? 'border-black' : 'border-transparent'}`}
                style={{ background: item }}
                onClick={() => handelcolor(item)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Themecolor;
