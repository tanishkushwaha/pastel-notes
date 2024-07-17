import React from 'react'

export default function Note({ title, body }: { title: string, body: string }) {


  return (
    <div className={`w-64 h-64 bg-pastelYellow rounded-xl p-4 flex flex-col`}>
      <h1 className="text-2xl mb-4">{title}</h1>
      <div className="text-lg overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate doloremque vel, maiores non obcaecati laudantium, amet atque in dolores excepturi est harum deserunt minima distinctio quia inventore et eveniet eligendi.</div>
    </div>
  )
}
