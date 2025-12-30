import { LuMenu } from "react-icons/lu";

export default function Header({
  sideDrawerOpener,
}: {
  sideDrawerOpener: () => void;
}) {
  return (
    <div className='relative py-4'>
      <LuMenu
        className='absolute z-20 size-8 cursor-pointer ml-4'
        onClick={sideDrawerOpener}
      />
      <h1 className='absolute z-10 w-full text-2xl text-center select-none'>
        Pastel Notes
      </h1>
    </div>
  );
}
