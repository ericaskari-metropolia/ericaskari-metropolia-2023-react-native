const baseUrl = 'https://media.mw.metropolia.fi/wbma';

export const useAuthentication = () => {
    const handleResponse = async (fetch) => {
        try {
            const response = await fetch();
            if (response.ok) {
                return [await response.json(), null, response.status];
            } else {
                return [null, await response.json(), response.status];
            }
        } catch (error) {
            return [null, error, 0];
        }
    };

    const getFilesByTag = async ({ tag }) => {
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            return await fetch(baseUrl + `/tags/${tag}`, {
                method: 'GET',
                headers,
            });
        });
    };
    const getMediaById = async ({ mediaId }) => {
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            return await fetch(baseUrl + `/media/${mediaId}`, {
                method: 'GET',
                headers,
            });
        });
    };
    const postLogin = async ({ username, password }) => {
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            return await fetch(baseUrl + '/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers,
            });
        });
    };

    const postRegister = async ({ username, password, email, fullName }) => {
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            return await fetch(baseUrl + '/users', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    full_name: fullName,
                }),
                headers,
            });
        });
    };

    const checkUsername = async ({ username }) => {
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            return await fetch(baseUrl + `/users/username/${username}`, {
                method: 'GET',
                headers,
            });
        });
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
        checkUsername: checkUsername,
    };
};
