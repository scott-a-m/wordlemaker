import React, { useContext, useState } from "react";

const SiteContext = React.createContext();

const SiteProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(1);

  return (
    <SiteContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

const useSiteContext = () => {
  return useContext(SiteContext);
};

export { SiteProvider, useSiteContext };
