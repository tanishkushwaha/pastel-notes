'use client';

import Note from "@/components/Note";
import { createContext, useContext, useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { getSession, redirectTo, getUserNotes } from "@/lib/actions";
import AddNoteButton from "@/components/AddNoteButton";
import { UpdateProvider } from "@/contexts/useUpdate";


type Note = {
  id: string;
  title: string;
  content: string;
}

export default function Notes() {
  const [authenticated, setAuthenticated] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [update, setUpdate] = useState(false);


  // Auth check
  useEffect(() => {
    getSession().then((session) => {

      // If session is available, set authenticated to true and fetch user notes
      if (session && session.user) {
        setAuthenticated(true);
        getUserNotes(session.user.id as string).then((notes) => {
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
      getSession().then((session) => {
        getUserNotes(session?.user?.id as string).then((notes) => {
          setNotes(notes);
        });
      });

      setUpdate(false);
    }
  }, [update]);


  // Loading spinner
  if (!authenticated) {
    return (
      <div className="h-screen flex justify-center items-center">
        <BarLoader />
      </div>
    )
  }

  return (
    <>
      <UpdateProvider value={{ update, setUpdate }}>
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {notes.map((note) => (
            <Note key={note.id} id={note.id} title={note.title} body={note.content} />
          ))}
        </div>
        <AddNoteButton />
      </UpdateProvider>
    </>
  )
}
