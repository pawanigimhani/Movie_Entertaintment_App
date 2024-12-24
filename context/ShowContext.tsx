import { createContext, useContext, useState } from 'react';

type ShowContextType = {
  clickCount: number;
  incrementClick: () => void;
};

const ShowContext = createContext<ShowContextType>({} as ShowContextType);

export function ShowProvider({ children }: { children: React.ReactNode }) {
  const [clickCount, setClickCount] = useState(0);

  return (
    <ShowContext.Provider
      value={{
        clickCount,
        incrementClick: () => setClickCount(prev => prev + 1),
      }}>
      {children}
    </ShowContext.Provider>
  );
}

export const useShow = () => useContext(ShowContext);