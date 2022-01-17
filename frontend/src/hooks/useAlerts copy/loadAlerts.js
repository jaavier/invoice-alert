export default async function loadAlerts({ status, limit }) {
	let url = 'http://localhost:3000/api/alerts';
	if (status) url += `?status=${status}`;
	if (status && limit) url += `&limit=${limit}`;
	if (!status && limit) url += `?limit=${limit}`;
	const response = await fetch(url);
	if (response.status === 404) throw new Error('Alert not found');
	const data = await response.json();
	return data;
}
