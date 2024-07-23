'use client';

import { useState } from "react";
import { LuTrash } from "react-icons/lu";
import { LuArchive } from "react-icons/lu";

function ColorPicker() {
  const bgColors = ['bg-pastelRed', 'bg-pastelOrange', 'bg-pastelYellow', 'bg-pastelGreen', 'bg-pastelCyan', 'bg-pastelBlue', 'bg-pastelPurple', 'bg-pastelPink'];
  const [active, setActive] = useState<string>('');


  const handleColorChange = (color: string) => {
    setActive(color);
  }

  return (
    <div className="border flex items-center gap-4">
      {bgColors.map((bgColor) => (
        <div key={bgColor} className={`rounded-full size-6 cursor-pointer border border-black ${bgColor}`} onClick={() => handleColorChange(bgColor)}></div>
      ))}

    </div>
  )
}

export default function NoteFooter() {
  return (
    <div className="flex justify-between items-center">
      <ColorPicker />
      <div className="flex items-baseline gap-4">
        <LuArchive className="text-black text-2xl cursor-pointer" />
        <LuTrash className="text-black text-2xl cursor-pointer" />
      </div>
    </div>
  )
}
