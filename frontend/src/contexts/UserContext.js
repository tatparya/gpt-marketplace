// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("Logged in user", user)
      }
      setCurrentUser(user);
    });

    return unsubscribe; // Unsubscribe on unmount
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
