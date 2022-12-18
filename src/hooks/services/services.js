import useFetch from '../useFetch';
import { REACT_APP_DOMAIN_API } from '~/constants.d';

const baseURL = REACT_APP_DOMAIN_API;

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
