import useFetch from '../useFetch';

const baseURL = process.env.BASE_URL;

export const getData = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, isLoading, hasError, execute } = useFetch(baseURL);

    const run = (method, path, body, ...params) => {
        execute({
            method,
            path,
            body,
            ...params,
        });
    };

    return [{ data, isLoading, hasError }, run];
};
