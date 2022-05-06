import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext({
    userinfo: {}
});

export const useApp = () => useContext(AppContext);

export const AppProvider = (props) => {
    const [userinfo, setUserinfo] = useState(JSON.parse(localStorage.getItem('userinfo') || '{}'))
    return (
        <AppContext.Provider value={{ userinfo, setUserinfo }} {...props} />
    );
};
