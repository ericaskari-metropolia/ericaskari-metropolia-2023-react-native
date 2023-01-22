import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext([]);

const MainContextProvider = ({ children, localStorageData }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorageData ?? null);

    return (
        <MainContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
            {children}
        </MainContext.Provider>
    );
};

MainContextProvider.propTypes = {
    children: PropTypes.node,
};

export { MainContext, MainContextProvider };
