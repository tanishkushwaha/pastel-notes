'use client';

import { useUpdate } from "@/contexts/useUpdate";
import { deleteNote, updateNote } from "@/lib/actions";
import { useEffect, useRef, useState } from "react";

export function EditNoteModal({ title, body, noteId, open, onClose }: { title?: string, body?: string, noteId?: string, open: boolean, onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [titleInput, setTitleInput] = useState(title);
  const titleInputRef = useRef(titleInput);
  const [bodyInput, setBodyInput] = useState(body);
  const bodyInputRef = useRef(bodyInput);
  const localUpdate = useRef(false);
  const { setUpdate } = useUpdate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'title') {
      setTitleInput(e.target.value);
    } else {
      setBodyInput(e.target.value);
    }
    localUpdate.current = true;
  }


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


  const handleClickOutside = async (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {

      if ((titleInputRef.current || bodyInputRef.current) && localUpdate.current) {
        await updateNote(noteId!, titleInputRef.current as string, bodyInputRef.current as string);
        console.log('note updated successfully', titleInputRef.current, bodyInputRef.current);
        localUpdate.current = false;

        setUpdate(true);
      }

      if (!titleInputRef.current && !bodyInputRef.current) {
        await deleteNote(noteId!);
        setUpdate(true);
      }
      onClose();
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 ${open ? 'flex' : 'hidden'} justify-center items-center z-10`}>
      <div className="flex flex-col bg-pastelYellow p-4 rounded-2xl min-h-96 w-2/4 drop-shadow-lg" ref={modalRef}>
        <input type="text" name="title" onChange={handleInputChange} value={titleInput} placeholder="Title" className='block text-2xl mb-8 w-full outline-none bg-transparent' />
        <textarea name="body" onChange={handleInputChange} value={bodyInput} placeholder="Take a note..." className='resize-none w-full flex-1 outline-none text-lg bg-transparent' />
      </div>
    </div>
  )
}