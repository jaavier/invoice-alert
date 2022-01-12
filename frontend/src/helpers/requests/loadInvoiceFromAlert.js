export default async function loadAlerts(alertId) {
	try {
		let url = 'http://localhost:3000/api/alerts';
		if (alertId) {
			url += `/${alertId}`;
		}
		const response = await fetch(url);
		const alerts = await response.json();
		return alerts;
	} catch (error) {}
}
