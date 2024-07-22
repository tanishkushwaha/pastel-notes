'use client';

import useDisclosure from "@/hooks/useDisclosure";
import Header from "./Header";
import SideDrawer from "./SideDrawer";


export default function Navbar() {
  const sideDrawer = useDisclosure();

  return (
    <>
      <SideDrawer open={sideDrawer.open} onClose={sideDrawer.onClose} />
      <Header sideDrawerOpener={sideDrawer.onOpen} />
    </>
  )
}
