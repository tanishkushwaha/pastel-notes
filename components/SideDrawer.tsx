import { signOut } from "next-auth/react";
import { FaRegNoteSticky } from "react-icons/fa6";
import { LuArrowLeftToLine, LuArchive, LuTrash, LuLogOut } from "react-icons/lu";


const SideDrawer = ({ toggle, toggler }: { toggle: boolean, toggler: () => void }) => {

  return (
    <div className={`bg-white h-screen absolute top-0 left-0 ${toggle ? 'w-1/5 p-4' : 'w-0 p-0'} transition-all overflow-hidden drop-shadow-xl flex flex-col`}>
      <LuArrowLeftToLine className="size-8 mb-8" onClick={toggler} />
      <Menu />
    </div>
  );
}

const Menu = () => {
  return (
    <ul className="h-auto flex flex-col flex-1">
      <li className="p-4 hover:bg-gray-100 text-lg flex items-center select-none">
        <FaRegNoteSticky className="mr-2" />
        Notes
      </li>
      <li className="p-4 hover:bg-gray-100 text-lg flex items-center select-none">
        <LuArchive className="mr-2" />
        Archive
      </li>
      <li className="p-4 hover:bg-gray-100 text-lg flex items-center select-none">
        <LuTrash className="mr-2" />
        Trash
      </li>
      <li className="p-4 hover:bg-gray-100 text-lg mt-auto flex items-center select-none" onClick={() => signOut()}>
        <LuLogOut className="mr-2" />
        Logout
      </li>
    </ul>
  );
}

export default SideDrawer;
