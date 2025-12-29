import useDisclosure from "@/hooks/useDisclosure";
import { EditNoteModal } from "./EditNoteModal";
import { DeleteConfirmationModalProvider } from "@/contexts/useDeleteConfirmationModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { NoteProvider } from "@/contexts/useNote";

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
      <NoteProvider value={{ id, title, body, bgColor, archived, trashed }}>
        <DeleteConfirmationModalProvider>
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
          <DeleteConfirmationModal />
        </DeleteConfirmationModalProvider>
        <div
          className={`min-h-64 ${bgColor} rounded-2xl p-8 flex flex-col drop-shadow-lg cursor-pointer hover:scale-105 transition-transform ease-out`}
          onClick={() => editNoteModal.onOpen()}
        >
          <h1 className='text-2xl mb-4'>{title}</h1>
          <div className='text-lg line-clamp-6'>{body}</div>
        </div>
      </NoteProvider>
    </>
  );
}
