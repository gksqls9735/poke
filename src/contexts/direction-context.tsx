import { createContext, useState, type ReactNode } from "react";

type DirectionContextType = {
  direction: number;
  setDirection: (dir: number) => void;
}

export const DirectionContext = createContext<DirectionContextType>({
  direction: 1,
  setDirection: () => {},
});

export const DirectionProvider = ({ children }: { children: ReactNode }) => {
  const [direction, setDirection] = useState<number>(1);

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      {children}
    </DirectionContext.Provider>
  );
};