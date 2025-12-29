"use client";

import Note from "@/components/Note";
import { useEffect, useState } from "react";
import { getArchivedNotes, getNotes, getTrashedNotes } from "@/lib/actions";
import { UpdateProvider } from "@/contexts/useUpdate";
import { Toaster } from "react-hot-toast";
import { Note as NoteType } from "@/lib/types";
import { Session } from "next-auth";
import AddNoteButton from "@/components/AddNoteButton";

export default function Notes({
  noteCategory,
  session,
}: {
  noteCategory: "normal" | "archived" | "trashed";
  session: Session;
}) {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [update, setUpdate] = useState(false);

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      if (session && session.user) {
        let data: NoteType[] = [];

        switch (noteCategory) {
          case "archived":
            console.log("fetching archived notes");
            data = await getArchivedNotes(session.user.id as string);
            break;
          case "normal":
            console.log("fetching notes");
            data = await getNotes(session.user.id as string);
            break;
          case "trashed":
            console.log("fetching trashed notes");
            data = await getTrashedNotes(session.user.id as string);
            break;
          default:
            throw new Error("Invalid prop value for 'type'");
        }

        setNotes(data);
      }
    };

    fetchNotes(); // fetch on mount

    if (update) {
      fetchNotes(); // fetch on update
      setUpdate(false);
    }
  }, [update, session]);

  return (
    <>
      <UpdateProvider value={{ update, setUpdate }}>
        <div className='grid grid-cols-4 gap-8 items-center my-16 mx-16'>
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.content}
              bgColor={note.color}
              archived={noteCategory === "archived"}
              trashed={noteCategory === "trashed"}
            />
          ))}
        </div>
        {noteCategory === "normal" && <AddNoteButton />}
      </UpdateProvider>
      <Toaster position='top-right' />
    </>
  );
}
