"use client";

import Note from "@/components/Note";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  getSession,
  redirectTo,
  getArchivedNotes,
  getTrashedNotes,
} from "@/lib/actions";
import { UpdateProvider } from "@/contexts/useUpdate";
import { Toaster } from "react-hot-toast";

type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
};

export default function Trash() {
  const [authenticated, setAuthenticated] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [update, setUpdate] = useState(false);

  // Auth check
  useEffect(() => {
    getSession().then((session) => {
      // If session is available, set authenticated to true and fetch user notes
      if (session && session.user) {
        setAuthenticated(true);
        getTrashedNotes(session.user.id as string).then((notes) => {
          setNotes(notes);
        });
      } else {
        redirectTo("/signin");
      }
    });
  }, []);

  // Check for updates and fetch notes
  useEffect(() => {
    if (update) {
      console.log("update detected, fetching notes...");

      getSession().then((session) => {
        getTrashedNotes(session?.user?.id as string).then((notes) => {
          setNotes(notes);
        });
      });

      setUpdate(false);
    }
  }, [update]);

  // Loading spinner
  if (!authenticated) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <BarLoader />
      </div>
    );
  }

  return (
    <>
      <UpdateProvider value={{ update, setUpdate }}>
        <div className='flex flex-wrap justify-center gap-4 mt-16'>
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.content}
              bgColor={note.color}
              trashed
            />
          ))}
        </div>
      </UpdateProvider>
      <Toaster position='top-right' />
    </>
  );
}
