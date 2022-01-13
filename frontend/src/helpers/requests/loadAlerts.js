export default async function loadAlerts(alertId) {
	let url = 'http://localhost:3000/api/alerts';
	if (alertId) url += `/${alertId}`;
	const response = await fetch(url);
	if (response.status === 404) throw new Error('Alert not found');
	const data = await response.json();
	return data;
}
