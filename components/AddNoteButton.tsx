import useDisclosure from "@/hooks/useDisclosure";
import { LuPencil } from "react-icons/lu";
import CreateNoteModal from "./CreateNoteModal";


export default function AddNoteButton() {
  const lightbox = useDisclosure();

  return (
    <>
      <CreateNoteModal open={lightbox.open} onClose={lightbox.onClose} />
      <div className="fixed bottom-8 right-16 rounded-full bg-black hover:bg-gray-900 flex justify-center items-center active:scale-95 cursor-pointer transition-all" onClick={() => { lightbox.onOpen() }}>
        <div className="flex text-white items-center gap-2 px-8 py-4">
          <LuPencil className="size-6" />
          <p className="text-xl">
            Create
          </p>
        </div>
      </div >
    </>
  )
}
