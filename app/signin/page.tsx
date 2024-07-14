

export default function Signin() {

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-center font-medium text-5xl">Sign in</h1>
        <form className="mt-8 w-96 grid grid-cols-[auto_1fr] grid-rows-2 gap-4">
          <label className="col-start-1 row-start-1 justify-self-end self-center text-2xl">username:</label>
          <input type="text" className="col-start-2 row-start-1 p-2 border-2 border-black rounded-lg" />
          <label className="col-start-1 row-start-2 justify-self-end self-center text-2xl">password:</label>
          <input type="password" className="col-start-2 row-start-2 p-2 border-2 border-black rounded-lg" />
          <button type="submit" className="block w-full p-2 bg-black border-2 border-black text-white rounded-lg mt-4 text-xl col-span-2 active:bg-white active:text-black transition-colors">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
