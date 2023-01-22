import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext([]);

const MainContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
