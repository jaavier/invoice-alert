import { useState, useEffect } from 'react';
import headers from './headers';

const baseUrl = 'http://localhost:3000/api';

export default function useApi(resource) {
	const [ queryString, setQueryString ] = useState({});
	const [ refresh, setRefresh ] = useState(false);
	const [ responses, setResponses ] = useState({
		remove: '',
		get: '',
		post: '',
		put: ''
	});

	const addQueryString = ({ key, value }) => {
		setRefresh(true);
		setQueryString({ ...queryString, [key]: value });
	};

	const request = async ({ method, body, customHeaders }) => {
		let url = baseUrl + '/' + resource;
		const keys = Object.keys(queryString);
		if (keys.length > 0) {
			let qs = '?' + keys.map((key) => key + '=' + queryString[key]).join('&');
			url += qs;
		}
		const response = await fetch(url, {
			method,
			headers: { ...headers, ...customHeaders },
			body: body ? JSON.stringify(body) : undefined
		});
		setRefresh(!refresh);
		if (response.status !== 200) throw new Error('API Error');
		const json = await response.json();
		setResponses({ ...responses, [method]: json });
		return json;
	};

	const remove = async (params) => await request({ method: 'delete', ...params });
	const get = async (params) => await request({ method: 'get', ...params });
	const post = async (params) => await request({ method: 'post', ...params });
	const put = async (params) => await request({ method: 'put', ...params });

	return {
		remove,
		get,
		post,
		put,
		responses,
		queryString,
		addQueryString
	};
}
