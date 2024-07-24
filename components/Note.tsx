import useDisclosure from "@/hooks/useDisclosure";
import { EditNoteModal } from "./EditNoteModal";

type NoteProps = {
  id: string;
  title: string;
  body: string;
  bgColor: string;
  archived?: boolean;
  trashed?: boolean;
};

export default function Note({
  id,
  title,
  body,
  bgColor,
  archived = false,
  trashed = false,
}: NoteProps) {
  const editNoteModal = useDisclosure();

  return (
    <>
      <EditNoteModal
        noteId={id}
        title={title}
        body={body}
        bgColor={bgColor}
        open={editNoteModal.open}
        onClose={editNoteModal.onClose}
        archived={archived}
        trashed={trashed}
      />
      <div
        className={`w-64 min-h-64 ${bgColor} rounded-2xl p-8 flex flex-col drop-shadow-lg`}
        onClick={() => editNoteModal.onOpen()}
      >
        <h1 className='text-2xl mb-4'>{title}</h1>
        <div className='text-lg line-clamp-6'>{body}</div>
      </div>
    </>
  );
}
