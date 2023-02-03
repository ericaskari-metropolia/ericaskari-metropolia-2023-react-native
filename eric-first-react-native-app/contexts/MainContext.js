import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/** @type {import('../types/types').AppContext} */
const MainContext = React.createContext({
    userProfile: null,
    accessToken: null,
    needsUpdate: true,
    setAccessToken: () => {},
    setNeedsUpdate: () => {},
    setUserProfile: () => {},
});

export const useMainContext = () => {
    const context = useContext(MainContext);

    return context;
};
export const MainContextProvider = ({
    children,
    defaultUserProfile,
    defaultAccessToken,
    onUserProfileSet,
    onAccessTokenSet,
}) => {
    const [userProfile, setUserProfile] = useState(defaultUserProfile ?? null);
    const [accessToken, setAccessToken] = useState(defaultAccessToken ?? null);
    const [needsUpdate, setNeedsUpdate] = useState(true);

    useEffect(() => {
        onUserProfileSet(userProfile);
    }, [userProfile]);

    return (
        <MainContext.Provider
            value={{
                userProfile,
                accessToken,
                setUserProfile: (userProfile) => {
                    setUserProfile(userProfile);
                    onUserProfileSet(userProfile);
                },
                setAccessToken: (accessToken) => {
                    setAccessToken(accessToken);
                    onAccessTokenSet(userProfile);
                },
                needsUpdate,
                setNeedsUpdate: (value) => setNeedsUpdate(value),
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

MainContextProvider.propTypes = {
    children: PropTypes.node,
};
