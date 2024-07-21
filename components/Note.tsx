import React from 'react'

export default function Note({ title, body }: { title: string, body: string }) {

  return (
    <div className={`w-64 min-h-64 bg-pastelYellow rounded-xl p-4 flex flex-col`}>
      <h1 className="text-2xl mb-4">{title}</h1>
      <div className="text-lg line-clamp-6">{body}</div>
    </div>
  )
}
