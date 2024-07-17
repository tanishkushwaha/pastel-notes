import { LuMenu } from "react-icons/lu";


export default function Navbar({ sideDrawerToggler }: { sideDrawerToggler: () => void }) {
  return (
    <div className="flex items-center p-4">
      <LuMenu className="size-8" onClick={sideDrawerToggler} />
      <h1 className="text-2xl mx-auto select-none">Something</h1>
    </div>
  )
}
