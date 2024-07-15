'use client';

import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import SideDrawer from "@/components/SideDrawer";

export default function Home() {
  const [toggle, setToggle] = useState(false);

  const toggler = () => {
    setToggle(prevState => !prevState);
  }

  return (
    <>
      <div className="w-screen p-4 flex items-center">
        <LuMenu className="size-8" onClick={toggler} />
        <h1 className="m-auto text-2xl select-none">Pastel Notes</h1>
      </div>
      <SideDrawer toggle={toggle} toggler={toggler} />
    </>
  )
}