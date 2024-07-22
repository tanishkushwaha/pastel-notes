
import useDisclosure from '@/hooks/useDisclosure';
import { EditNoteModal } from './EditNoteModal';

export default function Note({ id, title, body }: { id: string, title: string, body: string }) {
  const lightbox = useDisclosure();

  return (
    <>
      <EditNoteModal noteId={id} title={title} body={body} open={lightbox.open} onClose={lightbox.onClose} />
      <div className={`w-64 min-h-64 bg-pastelYellow rounded-2xl p-8 flex flex-col drop-shadow-lg`} onClick={() => lightbox.onOpen()}>
        <h1 className="text-2xl mb-4">{title}</h1>
        <div className="text-lg line-clamp-6">{body}</div>
      </div>
    </>
  )
}


