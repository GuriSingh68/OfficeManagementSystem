import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ContextType ={
    isAuthenticated:Boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext= createContext<ContextType | undefined>(undefined);

export const AuthProvider:React.FC<{children:ReactNode}> =({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if(token)
        setIsAuthenticated(!isAuthenticated);
    },[])
    return (
        <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated}}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };