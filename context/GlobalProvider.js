import React, { createContext, useContext, useEffect, useState } from "react";
import { currentUser, logout } from "@/data/api";
import { router} from "expo-router";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([]);


    const checkLoggedIn = async () => {
      setLoading(true);
      try {
        const response = await currentUser();
  
      if (response && response.user) {
          setIsLogged(true);
          setUser(response.user);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking login status:', error.message || error);
        setIsLogged(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if(isLogged) {
    checkLoggedIn();
      }
  }, [isLogged]);

  //logout user
  const logoutUser = async () => {
    try {
      await logout(); 
      setIsLogged(false);
      setUser(null);
      setEntries([]);
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error logging out:', error.message || error);
    }
  };

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
        logoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
