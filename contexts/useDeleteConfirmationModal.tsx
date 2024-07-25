import useDisclosure from "@/hooks/useDisclosure";
import { createContext, use, useContext } from "react";
import { useNote } from "./useNote";
import { deleteNote } from "@/lib/actions";
import toast from "react-hot-toast";
import { useUpdate } from "./useUpdate";

type DeleteConfirmationModalContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteConfirmationModalContext =
  createContext<DeleteConfirmationModalContextType | null>(null);

export const DeleteConfirmationModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { open, onOpen, onClose } = useDisclosure();
  const { id } = useNote();
  const { setUpdate } = useUpdate();

  const onDelete = async () => {
    const res = await deleteNote(id);
    if (res.success) {
      console.log(res.message);
      toast.success(res.message);
      onClose();
      setUpdate(true);
    } else {
      console.error(res.message);
      toast.error(res.message);
    }
  };

  return (
    <DeleteConfirmationModalContext.Provider
      value={{ isOpen: open, onOpen, onClose, onDelete }}
    >
      {children}
    </DeleteConfirmationModalContext.Provider>
  );
};

export const useDeleteConfirmationModal = () => {
  const context = useContext(DeleteConfirmationModalContext);
  if (!context) {
    throw new Error(
      "useDeleteConfirmationModal must be used within a DeleteConfirmationModalProvider"
    );
  }
  return context;
};
