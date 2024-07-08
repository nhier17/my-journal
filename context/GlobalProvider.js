import React, { createContext, useContext, useEffect, useState } from "react";
import { currentUser } from "@/data/api";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([]);


  useEffect(() =>{
  const checkLoggedIn = async () => {
    try {
      const isLoggedIn = await currentUser();
      if(isLoggedIn) {
        setIsLogged(true)
        setUser(isLoggedIn.user);
      } else {
        setIsLogged(false);
        setUser(null);
      }

    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }

  checkLoggedIn();
  
}, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        setLoading,
        entries,
        setEntries,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
