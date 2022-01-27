// not used here but usefull
import { useState, useCallback } from 'react';

const useFetch = (url, init = null) => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	const fetchData = useCallback(async () => {
		try {
			setError(null);
			setResponse(null);
			setIsFetching(true);
			// start fetching
			const response = await window.fetch(url, init);
			// console.log(response);

			// check if response is ok
			if (!response.ok) {
				throw new Error({
					status: response.status,
					message: response.statusText,
				});
			}

			setResponse(response);
		} catch (error) {
			// catches errors
			console.log(error);
			setError(error);
		} finally {
			setIsFetching(false);
		}
	}, [url, init]);

	return { response, error, isFetching, fetchData };
};

export const useFetchGet = (url, init) => {
	const { response, error, isFetching, fetchData } = useFetch(url, {
		...init,
		method: 'GET',
	});

	return { response, error, isFetching, fetchData };
};

export const useFetchPost = (url, init) => {
	const { response, error, isFetching, fetchData } = useFetch(url, {
		...init,
		method: 'POST',
	});

	return { response, error, isFetching, fetchData };
};

export const useFetchPut = (url, init) => {
	const { response, error, isFetching, fetchData } = useFetch(url, {
		...init,
		method: 'PUT',
	});

	return { response, error, isFetching, fetchData };
};

export const useFetchDelete = (url, init) => {
	const { response, error, isFetching, fetch } = useFetch(url, {
		...init,
		method: 'DELETE',
	});

	return { response, error, isFetching, fetchData };
};
