import { useState } from "react";

export default function useDisclosure() {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onToggle = () => setOpen((prev) => !prev);

  return { open, onOpen, onClose, onToggle };
}
