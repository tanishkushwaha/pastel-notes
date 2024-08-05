import { LuMenu } from "react-icons/lu";

export default function Header({
  sideDrawerOpener,
}: {
  sideDrawerOpener: () => void;
}) {
  return (
    <div className='flex items-center p-4'>
      <LuMenu className='size-8 cursor-pointer' onClick={sideDrawerOpener} />
      <h1 className='text-2xl mx-auto select-none'>Pastel Notes</h1>
    </div>
  );
}
