import { LightBox } from './LightBox';
import useDisclosure from '@/hooks/useDisclosure';

export default function Note({ id, title, body, setUpdate }: { id: string, title: string, body: string, setUpdate: React.Dispatch<React.SetStateAction<boolean>> }) {
  const lightbox = useDisclosure();

  return (
    <>
      <LightBox type='edit' id={id} title={title} body={body} open={lightbox.open} onClose={lightbox.onClose} setUpdate={setUpdate} />
      <div className={`w-64 min-h-64 bg-pastelYellow rounded-2xl p-4 flex flex-col drop-shadow-lg`} onClick={() => lightbox.onOpen()}>
        <h1 className="text-2xl mb-4">{title}</h1>
        <div className="text-lg line-clamp-6">{body}</div>
      </div>
    </>
  )
}


