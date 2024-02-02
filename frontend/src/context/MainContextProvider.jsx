import { createContext, useState } from 'react';

export const MainContext = createContext(null);

const MainContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [eventData, setEventData] = useState([]);
  return (
    <MainContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        eventData,
        setEventData
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
