"use client";

import Note from "@/components/Note";
import { useEffect, useState } from "react";
import { getArchivedNotes, getNotes, getTrashedNotes } from "@/lib/actions";
import { UpdateProvider } from "@/contexts/useUpdate";
import { Toaster } from "react-hot-toast";
import { Note as NoteType } from "@/lib/types";
import { Session } from "next-auth";

export default function Notes({
  type,
  session,
}: {
  type: "normal" | "archived" | "trashed";
  session: Session;
}) {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [update, setUpdate] = useState(false);

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      if (session && session.user) {
        let data: NoteType[] = [];

        switch (type) {
          case "archived":
            data = await getArchivedNotes(session.user.id as string);
            break;
          case "normal":
            data = await getNotes(session.user.id as string);
            break;
          case "trashed":
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
        <div className='flex flex-wrap justify-center gap-4 mt-16'>
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.content}
              bgColor={note.color}
              archived
            />
          ))}
        </div>
      </UpdateProvider>
      <Toaster position='top-right' />
    </>
  );
}
