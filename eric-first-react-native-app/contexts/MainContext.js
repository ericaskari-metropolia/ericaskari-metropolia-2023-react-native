import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/** @type {import('../types/types').AppContext} */
const MainContext = React.createContext([]);

const MainContextProvider = ({
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
            value={[
                userProfile,
                accessToken,
                (userProfile) => {
                    setUserProfile(userProfile);
                    onUserProfileSet(userProfile);
                },
                (accessToken) => {
                    setAccessToken(accessToken);
                    onAccessTokenSet(userProfile);
                },
                needsUpdate,
                setNeedsUpdate,
            ]}
        >
            {children}
        </MainContext.Provider>
    );
};

MainContextProvider.propTypes = {
    children: PropTypes.node,
};

export { MainContext, MainContextProvider };
