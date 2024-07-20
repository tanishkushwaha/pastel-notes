'use client';

import SideDrawer from "@/components/SideDrawer";
import useToggle from "@/hooks/useToggle";
import Navbar from "@/components/Navbar";
import Note from "@/components/Note";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { getSession, redirectTo } from "@/lib/actions";


export default function Home() {
  const [authenticated, setAuthenticated] = useState({ pending: true, value: false, redirect: false });
  const sideDrawer = useToggle();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setAuthenticated({ pending: false, value: true, redirect: false });
      } else {
        setAuthenticated({ pending: false, value: false, redirect: true });
      }
    });
  }, []);

  useEffect(() => {
    if (authenticated.redirect) {
      redirectTo("/signin");
    }
  }, [authenticated.redirect]);

  if (authenticated.pending || authenticated.redirect) {
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
        <Note title="Some Title" body="Some body..." />
        <Note title="Some Title" body="Some body..." />
        <Note title="Some Title" body="Some body..." />
        <Note title="Some Title" body="Some body..." />
        <Note title="Some Title" body="Some body..." />
      </div>
    </>
  )
}