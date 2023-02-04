import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/** @type {import('../types/types').AppContext} */
const MainContext = React.createContext({
    userProfile: null,
    accessToken: null,
    needsUpdate: true,
    expirationDate: null,
    setAccessToken: () => {},
    setNeedsUpdate: () => {},
    setExpirationDate: () => {},
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
    defaultExpirationDate,
    onUserProfileSet,
    onAccessTokenSet,
    onExpirationDateSet,
}) => {
    const [userProfile, setUserProfile] = useState(defaultUserProfile ?? null);
    const [accessToken, setAccessToken] = useState(defaultAccessToken ?? null);
    const [expirationDate, setExpirationDate] = useState(
        defaultExpirationDate ?? null
    );
    const [needsUpdate, setNeedsUpdate] = useState(true);

    useEffect(() => {
        onUserProfileSet(userProfile);
    }, [userProfile]);

    return (
        <MainContext.Provider
            value={{
                userProfile,
                accessToken,
                expirationDate,
                setUserProfile: (userProfile) => {
                    setUserProfile(userProfile);
                    onUserProfileSet(userProfile);
                },
                setAccessToken: (accessToken) => {
                    setAccessToken(accessToken);
                    onAccessTokenSet(accessToken);
                },
                setExpirationDate: (date) => {
                    setExpirationDate(date);
                    onExpirationDateSet(date);
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
