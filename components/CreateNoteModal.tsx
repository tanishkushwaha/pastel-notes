'use client';

import { useSession } from "@/contexts/useSession";
import { useUpdate } from "@/contexts/useUpdate";
import { createNote } from "@/lib/actions";
import { useEffect, useRef, useState } from "react";
import { LuArchive, LuTrash } from "react-icons/lu";

export default function createNoteModal({ open, onClose }: { title?: string, body?: string, open: boolean, onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [titleInput, setTitleInput] = useState('');
  const titleInputRef = useRef(titleInput);
  const [bodyInput, setBodyInput] = useState('');
  const bodyInputRef = useRef(bodyInput);
  const [bgColor, setbgColor] = useState('bg-pastelYellow');
  const bgColorRef = useRef(bgColor);
  const session = useSession();
  const { setUpdate } = useUpdate();

  useEffect(() => {
    bgColorRef.current = bgColor;
  }, [bgColor]);

  useEffect(() => {
    titleInputRef.current = titleInput;
  }, [titleInput]);

  useEffect(() => {
    bodyInputRef.current = bodyInput;
  }, [bodyInput]);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'title') {
      setTitleInput(e.target.value);
    } else {
      setBodyInput(e.target.value);
    }
  }

  const resetStates = () => {
    setTitleInput('');
    setBodyInput('');
    setbgColor('bg-pastelYellow');
  }

  const handleClickOutside = async (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {

      if (titleInputRef.current && bodyInputRef.current && session?.user?.id) {

        await createNote(session?.user?.id, titleInputRef.current as string, bodyInputRef.current as string, bgColorRef.current as string);

        setUpdate(true);
      }

      resetStates();
      onClose();
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 ${open ? 'flex' : 'hidden'} justify-center items-center z-10`}>
      <div className={`flex flex-col ${bgColor} p-8 rounded-2xl min-h-96 w-2/4 drop-shadow-lg`} ref={modalRef}>
        <input type="text" name="title" onChange={handleInputChange} value={titleInput} placeholder="Title" className='block text-2xl mb-8 w-full outline-none bg-transparent' />
        <textarea name="body" onChange={handleInputChange} value={bodyInput} placeholder="Take a note..." className='resize-none w-full flex-1 outline-none text-lg bg-transparent' />
        <NoteFooter bgColor={bgColor} setbgColor={setbgColor} />
      </div>
    </div>
  )
}

function NoteFooter({ archiveButton, trashButton, bgColor, setbgColor }: { archiveButton?: boolean, trashButton?: boolean, bgColor: string, setbgColor: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <div className="flex justify-between items-center">
      <ColorPicker bgColor={bgColor} setbgColor={setbgColor} />
      <div className="flex items-baseline gap-4">
        {archiveButton && <LuArchive className="text-black text-2xl cursor-pointer" />}
        {trashButton && <LuTrash className="text-black text-2xl cursor-pointer" />}
      </div>
    </div>
  )
}

function ColorPicker({ bgColor, setbgColor }: { bgColor: string, setbgColor: React.Dispatch<React.SetStateAction<string>> }) {
  const bgColors = ['bg-pastelRed', 'bg-pastelOrange', 'bg-pastelYellow', 'bg-pastelGreen', 'bg-pastelCyan', 'bg-pastelBlue', 'bg-pastelPurple', 'bg-pastelPink'];

  const [active, setActive] = useState<string>('bg-pastelYellow');

  useEffect(() => {
    setActive(bgColor);

  }, [bgColor]);

  const handleColorChange = (clickedColor: string) => {
    setbgColor(clickedColor);
  }

  return (
    <div className="flex items-center gap-4">
      {bgColors.map((bgColor) => (
        <div key={bgColor} className={`rounded-full size-6 cursor-pointer border border-black ${active === bgColor && 'border-2'} ${bgColor}`} onClick={() => handleColorChange(bgColor)}></div>
      ))}

    </div>
  )
}