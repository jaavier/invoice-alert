import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/api';
const headers = {
	get: {},
	post: {
		'Content-Type': 'application/json'
	},
	put: {
		'Content-Type': 'application/json'
	},
	delete: {}
};
export default function useApi(resource) {
	const [ id, setId ] = useState('');
	const [ status, setStatus ] = useState('');
	const [ limit, setLimit ] = useState('');
	const [ responses, setResponses ] = useState({
		remove: '',
		get: '',
		post: '',
		put: ''
	});
	const [ response, setResponse ] = useState('');
	const connect = async ({ method, body, id }) => {
		let url = baseUrl + '/' + resource;
		if (!id) {
			if (status && !limit) {
				url += `?status=${status}`;
			} else if (limit && !status) {
				url += `?limit=${limit}`;
			} else if (status && limit) {
				url += `?status=${status}&limit=${limit}`;
			}
		} else {
			url += `/${id}`;
		}
		const response = await fetch(url, {
			method,
			headers: headers[method],
			body: body ? JSON.stringify(body) : undefined
		});
		const json = await response.json();
		setResponse(json);
		setResponses({ ...responses, [method]: json });
	};

	const remove = async (id) => await connect({ method: 'delete', id });
	const get = async (id) => await connect({ method: 'get', id });
	const post = async (body) => await connect({ method: 'post', body });
	const put = async (id, body) => await connect({ method: 'put', id, body });

	useEffect(
		() => {
			get(id);
		},
		[ responses['delete'], status, limit ]
	);

	return {
		remove,
		get,
		post,
		put,
		response,
		responses,
		params: { id, setId, status, setStatus, limit, setLimit }
	};
}
