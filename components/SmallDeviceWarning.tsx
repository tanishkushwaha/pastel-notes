export default function SmallDeviceWarning() {
  return (
    <div className="fixed w-full h-full bg-black z-50 flex md:hidden justify-center items-center text-white md">
      <h1>Not optimized for mobile devices. Please view on a larger device</h1>
    </div>
  )
}
