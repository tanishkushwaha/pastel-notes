'use client';

import SideDrawer from "@/components/SideDrawer";
import useToggle from "@/hooks/useToggle";
import Navbar from "@/components/Navbar";
import Note from "@/components/Note";

export default function Home() {
  const sideDrawer = useToggle();

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