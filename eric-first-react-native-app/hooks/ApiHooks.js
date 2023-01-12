import {useEffect, useState} from 'react';

export const BASE_URL = 'https://media.mw.metropolia.fi/wbma';

export const uriBuilder = (fileName) => `${BASE_URL}/uploads/${fileName}`;

const useMedia = () => {
  const [mediaList, setMediaList] = useState([]);
  const [mediaDetailsList, setMediaDetailsList] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    (async () => {
      try {
        const mediaListResponse = await fetch(`${BASE_URL}/media`);
        const mediaList = await mediaListResponse.json();
        setMediaList(mediaList);
        const mediaDetailsListPromise = mediaList.map(async (media) => {
          const medialDetailsResponse = await fetch(
            `${BASE_URL}/media/${media.file_id}`
          );
          return await medialDetailsResponse.json();
        });

        const mediaDetailsList = await Promise.all(mediaDetailsListPromise);
        setMediaDetailsList(mediaDetailsList);
        setIsLoading(false);
        setHasError(false);
      } catch (e) {
        setMediaList([]);
        setIsLoading(false);
        setHasError(true);
        console.log(e);
      }
    })();
  }, []);

  return {mediaList, hasError, isLoading, mediaDetailsList};
};

export {useMedia};
