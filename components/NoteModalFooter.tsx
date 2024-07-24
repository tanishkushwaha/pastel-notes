import { useEffect, useState } from "react";
import { LuArchive, LuTrash } from "react-icons/lu";

type NoteModalFooterProps = {
  archiveButton?: boolean;
  trashButton?: boolean;
  bgColor: string;
  setbgColor: React.Dispatch<React.SetStateAction<string>>;
  madeChanges?: React.MutableRefObject<boolean>
};

export default function NoteModalFooter({ archiveButton, trashButton, bgColor, setbgColor, madeChanges }: NoteModalFooterProps) {
  return (
    <div className="flex justify-between items-center">
      <ColorPicker bgColor={bgColor} setbgColor={setbgColor} madeChanges={madeChanges} />
      <div className="flex items-baseline gap-4">
        {archiveButton && <LuArchive className="text-black text-2xl cursor-pointer" />}
        {trashButton && <LuTrash className="text-black text-2xl cursor-pointer" />}
      </div>
    </div>
  )
}

function ColorPicker({ bgColor, setbgColor, madeChanges }: { bgColor: string, setbgColor: React.Dispatch<React.SetStateAction<string>>, madeChanges?: React.MutableRefObject<boolean> }) {
  const bgColors = ['bg-pastelRed', 'bg-pastelOrange', 'bg-pastelYellow', 'bg-pastelGreen', 'bg-pastelCyan', 'bg-pastelBlue', 'bg-pastelPurple', 'bg-pastelPink'];

  const [active, setActive] = useState<string>('bg-pastelYellow');

  useEffect(() => {
    setActive(bgColor);

  }, [bgColor]);

  const handleColorChange = (clickedColor: string) => {
    setbgColor(clickedColor);
    if (madeChanges) {
      madeChanges.current = true;
    }
  }

  return (
    <div className="flex items-center gap-4">
      {bgColors.map((bgColor) => (
        <div key={bgColor} className={`rounded-full size-6 cursor-pointer border border-black ${active === bgColor && 'border-2'} ${bgColor}`} onClick={() => handleColorChange(bgColor)}></div>
      ))}

    </div>
  )
}
