import React from "react";

export const AppContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: (value: boolean) => {
    }
});
