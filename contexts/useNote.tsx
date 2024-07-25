import { createContext, useContext } from "react";

type NoteContextType = {
  id: string;
  title: string;
  body: string;
  bgColor: string;
  archived?: boolean;
  trashed?: boolean;
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
};

export const NoteProvider = ({
  value,
  children,
}: {
  value: NoteContextType;
  children: React.ReactNode;
}) => {
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
