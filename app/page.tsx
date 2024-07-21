'use client';

import SideDrawer from "@/components/SideDrawer";
import useToggle from "@/hooks/useToggle";
import Navbar from "@/components/Navbar";
import Note from "@/components/Note";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { getSession, redirectTo, getUserNotes } from "@/lib/actions";


type Note = {
  id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const sideDrawer = useToggle();

  // Auth check
  useEffect(() => {
    getSession().then((session) => {

      // If session is available, set authenticated to true and fetch user notes
      if (session && session.user) {
        setAuthenticated(true);
        console.log('session:', session.user);

        getUserNotes(session.user.id as string).then((notes) => {
          console.log('notes:', notes);
          setNotes(notes);
        });

      } else {
        redirectTo("/signin");
      }
    });
  }, []);


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
      <SideDrawer toggle={sideDrawer.toggle} toggler={sideDrawer.toggler} />
      <Navbar sideDrawerToggler={sideDrawer.toggler} />

      <div className="flex flex-wrap justify-center gap-4 mt-16">
        {notes.map((note) => (
          <Note key={note.id} title={note.title} body={note.content} />
        ))}
      </div>
    </>
  )
}