import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Appcontext } from '@/context/appcontext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AichatSession } from './../../../../../service/aimodal';
import { Updateresume } from './../../../../../service/globalapi';

const PROMPT = 'position title: {position title}, Depends on position title give me 5-7 bullet points for my experience in resume, give me result in HTML format';

function Richtexteditor({ onRichTexteditorchange, index, initialValue }) {
  const [value, setvalue] = useState(initialValue || '');
  const { resumeinfo, setresumeinfo } = useContext(Appcontext);
  const [loading, setloading] = useState(false);

  const Generatesummery = async () => {
    setloading(true);
    if (!resumeinfo.experience[index]?.title) {
      toast('Please Add Position Title');
      setloading(false);
      return;
    }
    try {
      const prompt = PROMPT.replace('{position title}', resumeinfo.experience[index].title);
      const result = await AichatSession.sendMessage(prompt);
      const responseText = await result.response.text();

      if (typeof responseText === 'string') {
        const cleanedResponse = responseText.replace(/^\{[^:]+:\s*\[?/, '').replace(/\]?\}$/, '');
        setvalue(cleanedResponse);
      } else {
        toast('Invalid response format');
        console.error('Invalid response format:', responseText);
      }

    } catch (error) {
      toast('Failed to generate summary from AI');
      console.error('AI Generation Error:', error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    setvalue(initialValue || '');
  }, [initialValue]);

  const handleSave = async () => {
    setloading(true);
    const updatedExperience = resumeinfo.experience.map((exp, i) => 
      i === index ? { ...exp, summary: value } : exp
    );
    const data = { data: { experience: updatedExperience } };

    try {
      const response = await Updateresume(resumeinfo.id, data);
      setresumeinfo(prev => ({
        ...prev,
        experience: updatedExperience
      }));
      toast('Details Saved');
    } catch (error) {
      toast('Failed to save details');
      console.error('Save Error:', error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between my-2 items-center'>
        <label className='text-xs'>Summary</label>
        <Button onClick={Generatesummery} variant='outline' className='flex gap-2 border-primary text-primary'>
          {loading ? <LoaderCircle className='animate-spin' /> : <><Brain className='h-4 w-4' /> Generate from AI</>}
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          const editorValue = e.target.value;
          setvalue(editorValue);
          onRichTexteditorchange(editorValue);
        }}>
          <Toolbar>
            <BtnBold />
            <Separator />
            <BtnItalic />
            <Separator />
            <BtnUnderline />
            <Separator />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <Separator />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <Separator />
          </Toolbar>
        </Editor>
      </EditorProvider>
    
    </div>
  );
}

export default Richtexteditor;
