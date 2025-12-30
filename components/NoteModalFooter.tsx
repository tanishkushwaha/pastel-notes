import { useUpdate } from "@/contexts/useUpdate";
import useDisclosure from "@/hooks/useDisclosure";
import {
  archiveNote,
  deleteNote,
  restoreNote,
  trashNote,
  unarchiveNote,
} from "@/lib/actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuArchive, LuTrash } from "react-icons/lu";
import { LuArchiveRestore } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { LuArrowBigUp } from "react-icons/lu";
import { useDeleteConfirmationModal } from "@/contexts/useDeleteConfirmationModal";

type NoteModalFooterProps = {
  archiveButton?: boolean;
  unarchiveButton?: boolean;
  trashButton?: boolean;
  permanentTrashButton?: boolean;
  restoreButton?: boolean;
  bgColor: string;
  setbgColor: React.Dispatch<React.SetStateAction<string>>;
  madeChanges?: React.MutableRefObject<boolean>;
  noteId?: string;
};

export default function NoteModalFooter({
  archiveButton,
  unarchiveButton,
  trashButton,
  permanentTrashButton,
  restoreButton,
  bgColor,
  setbgColor,
  madeChanges,
  noteId,
}: NoteModalFooterProps) {
  const { setUpdate } = useUpdate();
  const { onOpen } = useDeleteConfirmationModal();

  const handleArchiveClick = () => {
    if (!noteId) return;

    archiveNote(noteId).then((res) => {
      if (res.success) {
        console.log(res.message);

        toast.success(res.message);
        setUpdate(true);
      } else {
        toast.error("Failed to archive note");
      }
    });
  };

  const handleUnarchiveClick = () => {
    if (!noteId) return;

    unarchiveNote(noteId).then((res) => {
      if (res.success) {
        console.log(res.message);

        toast.success(res.message);
        setUpdate(true);
      } else {
        toast.error("Failed to unarchive note");
      }
    });
  };

  const handleTrashClick = () => {
    if (!noteId) return;

    trashNote(noteId).then((res) => {
      if (res.success) {
        console.log(res.message);

        toast.success(res.message);
        setUpdate(true);
      } else {
        toast.error("Failed to move note to trash");
      }
    });
  };

  const handlePerrmanentTrashClick = () => {
    onOpen();
  };

  const handleRestoreClick = () => {
    if (!noteId) return;

    restoreNote(noteId).then((res) => {
      if (res.success) {
        toast.success(res.message);
        setUpdate(true);
      } else {
        toast.error("Failed to restore note");
      }
    });
  };

  return (
    <>
      <div className='w-full flex justify-between items-center'>
        <ColorPicker
          bgColor={bgColor}
          setbgColor={setbgColor}
          madeChanges={madeChanges}
        />
        <div className='flex items-baseline gap-4'>
          {archiveButton && (
            <LuArchive
              className='text-black text-2xl cursor-pointer'
              onClick={handleArchiveClick}
              title='Archive'
            />
          )}
          {unarchiveButton && (
            <LuArchiveRestore
              className='text-black text-2xl cursor-pointer'
              onClick={handleUnarchiveClick}
              title='Unarchive'
            />
          )}
          {trashButton && (
            <LuTrash
              className='text-black text-2xl cursor-pointer'
              title='Move to Trash'
              onClick={handleTrashClick}
            />
          )}
          {permanentTrashButton && (
            <LuTrash2
              className='text-black text-2xl cursor-pointer'
              title='Delete Permanently'
              onClick={handlePerrmanentTrashClick}
            />
          )}
          {restoreButton && (
            <LuArrowBigUp
              className='text-black text-2xl cursor-pointer'
              title='Restore'
              onClick={handleRestoreClick}
            />
          )}
        </div>
      </div>
    </>
  );
}

function ColorPicker({
  bgColor,
  setbgColor,
  madeChanges,
}: {
  bgColor: string;
  setbgColor: React.Dispatch<React.SetStateAction<string>>;
  madeChanges?: React.MutableRefObject<boolean>;
}) {
  const bgColors = [
    "bg-pastelRed",
    "bg-pastelOrange",
    "bg-pastelYellow",
    "bg-pastelGreen",
    "bg-pastelCyan",
    "bg-pastelBlue",
    "bg-pastelPurple",
    "bg-pastelPink",
  ];

  const [active, setActive] = useState<string>("bg-pastelYellow");

  useEffect(() => {
    setActive(bgColor);
  }, [bgColor]);

  const handleColorChange = (clickedColor: string) => {
    setbgColor(clickedColor);
    if (madeChanges) {
      madeChanges.current = true;
    }
  };

  return (
    <div className='w-full flex flex-wrap items-center gap-4'>
      {bgColors.map((bgColor) => (
        <div
          key={bgColor}
          className={`rounded-full size-6 cursor-pointer border border-black ${
            active === bgColor && "border-2"
          } ${bgColor}`}
          onClick={() => handleColorChange(bgColor)}
        ></div>
      ))}
    </div>
  );
}
