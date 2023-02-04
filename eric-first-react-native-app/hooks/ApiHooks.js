import { useEffect, useState } from 'react';

const baseUrl = 'https://media.mw.metropolia.fi/wbma';
export const appId = 'ericaska1';

export const useAuthentication = (accessToken) => {
    const handleResponse = async (fetch) => {
        try {
            const response = await fetch();
            if (response.ok) {
                return [await response.json(), null, response.status, response];
            } else {
                return [null, await response.json(), response.status, response];
            }
        } catch (error) {
            return [null, error, 0, null];
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
    const getUserById = async (userId) => {
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', accessToken);

            return await fetch(baseUrl + `/users/${userId}`, {
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

    const modifyMedia = async ({ title, description, fileId }) => {
        console.log({ title, description, fileId });
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', accessToken);
            return await fetch(baseUrl + `/media/${fileId}`, {
                method: 'PUT',
                body: JSON.stringify({ title, description }),
                headers,
            });
        });
    };

    const postTag = async ({ fileId, tag }) => {
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', accessToken);

            return await fetch(baseUrl + '/tags', {
                method: 'POST',
                body: JSON.stringify({
                    file_id: fileId,
                    tag,
                }),
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
    const deleteMedia = async (fileId) => {
        return handleResponse(async () => {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            headers.append('x-access-token', accessToken);

            return await fetch(baseUrl + `/media/${fileId}`, {
                method: 'DELETE',
                headers,
            });
        });
    };

    const getMediaUrlByFileName = (fileName) => {
        return `${baseUrl}/uploads/${fileName}`;
    };

    const useMedia = ({ needsUpdate, setNeedsUpdate, userId }) => {
        const [isLoaded, setIsLoaded] = useState(false);
        const [mediaArray, setMediaArray] = useState([]);

        useEffect(() => {
            if (!needsUpdate && isLoaded) {
                return;
            }
            console.log('Fetching Media');

            (async () => {
                const [items, error, status] = await getFilesByTag({
                    tag: appId,
                });
                console.log(`tag: ${appId} - file count: ${items?.length}`);
                if (!error) {
                    const itemsDetailsList = items.map((media) => {
                        return getMediaById({
                            mediaId: media.file_id,
                        });
                    });
                    const result = await Promise.all(itemsDetailsList);
                    const cleanList = result
                        .map((x) => x[0])
                        .filter((x) => !!x)
                        .filter((x) =>
                            userId === null || userId === undefined
                                ? true
                                : userId === x.user_id
                        );
                    setMediaArray(cleanList);
                    setMediaArray(cleanList);
                    setIsLoaded(true);
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
        postTag: postTag,
        uploadMedia: uploadMedia,
        modifyMedia: modifyMedia,
        getFilesByTag: getFilesByTag,
        getMediaById: getMediaById,
        getUserById: getUserById,
        getMediaUrlByFileName: getMediaUrlByFileName,
        checkUsername: checkUsername,
        useMedia: useMedia,
        deleteMedia: deleteMedia,
    };
};
