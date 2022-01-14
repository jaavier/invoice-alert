import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/api/alerts';
const headers = {
	get: {
		'Content-Type': 'application/json'
	},
	post: {
		'Content-Type': 'application/json'
	},
	put: {
		'Content-Type': 'application/json'
	},
	delete: {
		'Content-Type': 'application/json'
	}
};
export default function useAlerts() {
	const [ status, setStatus ] = useState('');
	const [ limit, setLimit ] = useState('');
	const [ responses, setResponses ] = useState({
		remove: '',
		get: '',
		post: '',
		put: ''
	});
	const connect = async ({ method, id, body }) => {
		let url = baseUrl;
		if (status && !limit) {
			url += `?status=${status}`;
		} else if (limit && !status) {
			url += `?limit=${limit}`;
		} else if (status && limit) {
			url += `?status=${status}&limit=${limit}`;
		} else if (id) {
			url += `/${id}`;
		}
		const response = await fetch(url, {
			method,
			headers: headers[method],
			body: body ? JSON.stringify(body) : undefined
		});
		const json = await response.json();
		setResponses({ ...responses, [method]: json });
	};

	const remove = async (id) => {
		await connect({ method: 'delete', id });
	};
	const get = async (id) => {
		await connect({ method: 'get', id });
	};
	const post = async (body) => {
		await connect({ method: 'post', body });
	};
	const put = async (id, body) => {
		await connect({ method: 'post', id, body });
	};

	useEffect(
		() => {
			get();
		},
		[ responses['delete'], status, limit ]
	);

	return { remove, get, post, put, responses, params: { status, setStatus, limit, setLimit } };
}
