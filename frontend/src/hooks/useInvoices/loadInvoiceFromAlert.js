export default async function loadAlerts({ alertId, status, limit }) {
	try {
		let url = 'http://localhost:3000/api/alerts';
		if (alertId) {
			url += `/${alertId}`;
		} else {
			if (status) url += `?status=${status}`;
			if (status && limit) url += `&limit=${limit}`;
			if (!status && limit) url += `?limit=${limit}`;
		}
		const response = await fetch(url);
		const alerts = await response.json();
		return alerts;
	} catch (error) {}
}
