import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from "react";

const UpdateContext = createContext<{ update: boolean; setUpdate: Dispatch<SetStateAction<boolean>> } | null>(null);

export const UpdateProvider = ({ value, children }: { value: { update: boolean, setUpdate: Dispatch<SetStateAction<boolean>> }, children: ReactNode }) => {

  return (
    <UpdateContext.Provider value={value}>
      {children}
    </UpdateContext.Provider>
  );
};

export function useUpdate() {
  const context = useContext(UpdateContext);

  if (!context) {
    throw new Error('useUpdate must be used within a UpdateProvider');
  }

  return context;
}
