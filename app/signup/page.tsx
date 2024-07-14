

export default function Signup() {

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-center font-medium text-5xl">Sign up</h1>
        <form className="mt-8 md:w-96 grid grid-cols-[auto_1fr] grid-rows-4 gap-4">

          <label className="col-start-1 row-start-1 self-center text-2xl">first name:</label>
          <input type="text" required className="col-start-2 row-start-1 p-2 border-2 border-black rounded-lg text-xl" />

          <label className="col-start-1 row-start-2 self-center text-2xl">last name:</label>
          <input type="text" required className="col-start-2 row-start-2 p-2 border-2 border-black rounded-lg text-xl" />

          <label className="col-start-1 row-start-3 self-center text-2xl">email:</label>
          <input type="email" required className="col-start-2 row-start-3 p-2 border-2 border-black rounded-lg text-xl" />

          <label className="col-start-1 row-start-4 self-center text-2xl">password:</label>
          <input type="password" required className="col-start-2 row-start-4 p-2 border-2 border-black rounded-lg text-xl" />

          <button type="submit" className="block w-full p-2 bg-black border-2 border-black text-white rounded-lg mt-4 text-2xl col-span-2 active:bg-white active:text-black transition-colors">
            Sign up
          </button>

        </form>
      </div>
    </div>
  )
}
