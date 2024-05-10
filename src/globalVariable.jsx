import React, { createContext, useState } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');

  return (
    <StateContext.Provider value={{ loggedIn, setLoggedIn, loginEmail, setLoginEmail }}>
      {children}
    </StateContext.Provider>
  );
};
