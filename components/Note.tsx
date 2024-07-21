import React, { useEffect, useRef, useState } from 'react'

function LightBox({ title, body, open, setOpen }: { title: string, body: string, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 ${open ? 'flex' : 'hidden'} justify-center items-center`}>
      <div className="bg-pastelYellow p-4 rounded-xl min-h-96 w-2/4" ref={modalRef}>
        <h1 className="text-2xl">{title}</h1>
        <p className="text-lg">{body}</p>
      </div>
    </div>
  )
}

export default function Note({ title, body }: { title: string, body: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LightBox title={title} body={body} open={open} setOpen={setOpen} />
      <div className={`w-64 min-h-64 bg-pastelYellow rounded-xl p-4 flex flex-col`} onClick={() => setOpen(true)}>
        <h1 className="text-2xl mb-4">{title}</h1>
        <div className="text-lg line-clamp-6">{body}</div>
      </div>
    </>
  )
}


