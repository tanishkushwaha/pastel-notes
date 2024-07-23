'use client';

import useDisclosure from "@/hooks/useDisclosure";
import Header from "./Header";
import SideDrawer from "./SideDrawer";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const sideDrawer = useDisclosure();
  const pathname = usePathname();

  const noNavbarRoutes = ["/signin", "/signup"];

  const showNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <>
      {showNavbar && (
        <>
          <SideDrawer open={sideDrawer.open} onClose={sideDrawer.onClose} />
          <Header sideDrawerOpener={sideDrawer.onOpen} />
        </>
      )}
    </>
  )
}
