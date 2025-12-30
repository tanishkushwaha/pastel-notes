"use client";

import { useUpdate } from "@/contexts/useUpdate";
import { deleteNote, updateNote } from "@/lib/actions";
import { useEffect, useRef, useState } from "react";
import NoteModalFooter from "./NoteModalFooter";

type EditNoteModalProps = {
  title?: string;
  body?: string;
  noteId?: string;
  bgColor: string;
  open: boolean;
  onClose: () => void;
  archived: boolean;
  trashed: boolean;
};

export function EditNoteModal({
  title,
  body,
  bgColor,
  noteId,
  open,
  onClose,
  archived,
  trashed,
}: EditNoteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [titleInput, setTitleInput] = useState(title);
  const titleInputRef = useRef(titleInput);
  const [bodyInput, setBodyInput] = useState(body);
  const bodyInputRef = useRef(bodyInput);
  const localUpdate = useRef(false);
  const { setUpdate } = useUpdate();
  const [tempBgColor, setTempBgColor] = useState(bgColor);
  const madeChanges = useRef(false);

  // Check for the local update and update globally
  useEffect(() => {
    if (localUpdate.current) {
      updateNote(
        noteId!,
        titleInputRef.current as string,
        bodyInputRef.current as string,
        tempBgColor as string
      ).then(() => {
        console.log(
          "note updated successfully",
          titleInputRef.current,
          bodyInputRef.current
        );
      });

      setUpdate(true);
      localUpdate.current = false;
      madeChanges.current = false;
    }
  }, [localUpdate.current]);

  useEffect(() => {
    titleInputRef.current = titleInput;
  }, [titleInput]);

  useEffect(() => {
    bodyInputRef.current = bodyInput;
  }, [bodyInput]);

  // Close modal when clicked outside
  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleClickOutside = async (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      if (
        (titleInputRef.current || bodyInputRef.current) &&
        madeChanges.current
      ) {
        localUpdate.current = true;
      }

      if (!titleInputRef.current && !bodyInputRef.current) {
        await deleteNote(noteId!);
        localUpdate.current = true;
      }
      onClose();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "title") {
      setTitleInput(e.target.value);
    } else {
      setBodyInput(e.target.value);
    }
    madeChanges.current = true;
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 ${
        open ? "flex" : "hidden"
      } justify-center items-center z-10`}
    >
      <div
        className={`flex flex-col ${tempBgColor} p-8 rounded-2xl min-h-96 w-[90%] lg:w-1/2 drop-shadow-lg`}
        ref={modalRef}
      >
        <input
          type='text'
          name='title'
          onChange={handleInputChange}
          value={titleInput}
          placeholder='Title'
          className='block text-2xl mb-8 w-full outline-none bg-transparent'
        />
        <textarea
          name='body'
          onChange={handleInputChange}
          value={bodyInput}
          placeholder='Take a note...'
          className='resize-none w-full flex-1 outline-none text-lg bg-transparent'
        />
        <NoteModalFooter
          bgColor={tempBgColor}
          setbgColor={setTempBgColor}
          madeChanges={madeChanges}
          noteId={noteId}
          archiveButton={!archived && !trashed}
          unarchiveButton={archived}
          trashButton={!trashed}
          permanentTrashButton={trashed}
          restoreButton={trashed}
        />
      </div>
    </div>
  );
}
