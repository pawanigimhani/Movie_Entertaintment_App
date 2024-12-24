import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  username: string | null;
  signIn: (username: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        username,
        signIn: (username) => setUsername(username),
        signOut: () => setUsername(null),
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);