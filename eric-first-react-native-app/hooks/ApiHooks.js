const baseUrl = 'https://media.mw.metropolia.fi/wbma';

export const useAuthentication = () => {
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

    return { postLogin: postLogin, postRegister: postRegister };
};
