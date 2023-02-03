import { useEffect, useState } from 'react';

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

    const uploadMedia = async ({
        accessToken,
        title,
        description,
        file: { uri, name, type },
    }) => {
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('x-access-token', accessToken);

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('file', {
                uri,
                name,
                type,
            });
            return await fetch(baseUrl + '/media', {
                method: 'POST',
                body: formData,
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

    const getMedia = async () => {
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            return await fetch(baseUrl + `/media`, {
                method: 'GET',
                headers,
            });
        });
    };

    const getMediaUrlByFileName = (fileName) => {
        return `${baseUrl}/uploads/${fileName}`;
    };

    const useMedia = ({ needsUpdate, setNeedsUpdate }) => {
        const [mediaArray, setMediaArray] = useState([]);

        useEffect(() => {
            if (!needsUpdate) {
                return;
            }
            (async () => {
                const [items, error] = await getMedia();
                if (!error) {
                    const itemsDetailsList = items.map((media) => {
                        return getMediaById({
                            mediaId: media.file_id,
                        });
                    });
                    const result = await Promise.all(itemsDetailsList);
                    const cleanList = result
                        .map((x) => x[0])
                        .filter((x) => !!x);
                    setMediaArray(cleanList);
                    setNeedsUpdate(false);
                } else {
                    //  TODO: Handle the error
                }
            })();
        }, [needsUpdate]);

        return { mediaArray };
    };

    return {
        postLogin: postLogin,
        postRegister: postRegister,
        uploadMedia: uploadMedia,
        getFilesByTag: getFilesByTag,
        getMediaById: getMediaById,
        getMediaUrlByFileName: getMediaUrlByFileName,
        checkUsername: checkUsername,
        useMedia: useMedia,
    };
};
