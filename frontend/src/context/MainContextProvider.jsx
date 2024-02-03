import { createContext, useState } from 'react';

export const MainContext = createContext(null);

const MainContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showPostPopUp, setShowPostPopUp] = useState(false);

  return (
    <MainContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        eventData,
        setEventData,
        progress,
        setProgress,
        showPostPopUp,
        setShowPostPopUp
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
