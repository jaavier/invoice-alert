export default async function loadAlerts({ alertId, status }) {
	try {
		let url = 'http://localhost:3000/api/alerts';
		if (alertId) url += `/${alertId}`;
		if (status) url += `?status=${status}`;
		const response = await fetch(url);
		const alerts = await response.json();
		return alerts;
	} catch (error) {}
}
