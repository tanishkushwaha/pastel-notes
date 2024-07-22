'use client';

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegNoteSticky } from "react-icons/fa6";
import { LuArrowLeftToLine, LuArchive, LuTrash, LuLogOut } from "react-icons/lu";


const SideDrawer = ({ open, onClose }: { open: boolean, onClose: () => void }) => {

  return (
    <nav className={`bg-white h-screen absolute top-0 left-0 ${open ? 'w-1/5 p-4' : 'w-0 p-0'} transition-all overflow-hidden drop-shadow-xl flex flex-col`}>
      <LuArrowLeftToLine className="size-8 mb-8 cursor-pointer" onClick={onClose} />
      <Menu />
    </nav>
  );
}

const Menu = () => {
  const pathname = usePathname();

  return (
    <ul className="h-auto flex flex-col flex-1">

      <li>
        <Link className={`p-4 transition-colors duration-300 text-lg flex items-center select-none rounded-2xl link ${pathname === '/notes' ? 'bg-gray-300' : ''}`} href="/notes">
          <FaRegNoteSticky className="mr-2" />
          Notes
        </Link>
      </li>

      <li>
        <Link className={`p-4 transition-colors duration-300 text-lg flex items-center select-none rounded-2xl link ${pathname === '/archive' ? 'bg-gray-300' : ''}`} href="/archive">
          <LuArchive className="mr-2" />
          Archive
        </Link>
      </li>

      <li>
        <Link className={`p-4 transition-colors duration-300 text-lg flex items-center select-none rounded-2xl link ${pathname === '/trash' ? 'bg-gray-300' : ''}`} href="/trash">
          <LuTrash className="mr-2" />
          Trash
        </Link>
      </li>

      <li className="p-4 hover:bg-gray-300 rounded-2xl text-lg mt-auto flex items-center select-none cursor-pointer" onClick={() => signOut()}>
        <LuLogOut className="mr-2" />
        Logout
      </li>

    </ul>
  );
}

export default SideDrawer;
