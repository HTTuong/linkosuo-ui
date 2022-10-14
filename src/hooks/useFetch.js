import axios from 'axios';
import React from 'react';

const useFetch = (baseURL) => {
    const [responseData, setResponseData] = React.useState(undefined);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, serError] = React.useState();
    const [executeParams, setExecuteParams] = React.useState();

    React.useEffect(() => {
        const abortController = new AbortController();
        if ([undefined, null].includes(executeParams.path)) return;

        const requestBody = {};

        if (executeParams.method === 'POST') {
            Object.assign(requestBody, executeParams.body);
        }

        setIsLoading(true);

        axios({
            method: executeParams.method,
            url: baseURL + executeParams.path,
            body: requestBody,
            signal: abortController.signal,
        })
            .then((response) => {
                setResponseData(response.data);
            })
            .catch((error) => {
                serError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });

        return () => {
            abortController.abort();
        };
    }, [baseURL, executeParams]);

    const execute = React.useCallback(
        (params) => {
            setExecuteParams(params);
        },
        [setExecuteParams],
    );

    return {
        isLoading: isLoading,
        hasError: error,
        data: responseData,
        execute,
    };
};

export default useFetch;
