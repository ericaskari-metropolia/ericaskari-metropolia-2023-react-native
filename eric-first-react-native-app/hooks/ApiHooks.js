const baseUrl = 'https://media.mw.metropolia.fi/wbma';

export const useAuthentication = () => {
    const getFilesByTag = async ({ tag }) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        try {
            const response = await fetch(baseUrl + `/tags/${tag}`, {
                method: 'GET',
                headers,
            });

            if (response.ok) {
                return [await response.json(), null, response.status];
            } else {
                return [null, await response.json(), response.status];
            }
        } catch (error) {
            return [null, error, 0];
        }
    };
    const getMediaById = async ({ mediaId }) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        try {
            const response = await fetch(baseUrl + `/media/${mediaId}`, {
                method: 'GET',
                headers,
            });

            if (response.ok) {
                return [await response.json(), null, response.status];
            } else {
                return [null, await response.json(), response.status];
            }
        } catch (error) {
            return [null, error, 0];
        }
    };
    const postLogin = async ({ username, password }) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        try {
            const response = await fetch(baseUrl + '/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers,
            });

            const json = await response.json();

            return {
                body: response.ok ? json : null,
                error: response.ok ? null : json,
                status: response.status,
            };
        } catch (error) {
            return {
                body: null,
                error: error,
                status: 0,
            };
        }
    };

    const postRegister = async ({ username, password, email, fullName }) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        try {
            const response = await fetch(baseUrl + '/users', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    full_name: fullName,
                }),
                headers,
            });

            const json = await response.json();

            return {
                body: response.ok ? json : null,
                error: response.ok ? null : json,
                status: response.status,
            };
        } catch (error) {
            return {
                body: null,
                error: error,
                status: 0,
            };
        }
    };

    const getMediaUrlByFileName = ({ fileName }) => {
        return `${baseUrl}/uploads/${fileName}`;
    };

    return {
        postLogin: postLogin,
        postRegister: postRegister,
        getFilesByTag: getFilesByTag,
        getMediaById: getMediaById,
        getMediaUrlByFileName: getMediaUrlByFileName,
    };
};
