export default async function unlockAlert(alertId, password) {
	const response = await fetch(`http://localhost:3000/api/alerts/unlock/${alertId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password })
	});
	const alert = await response.json();
	if (response.status === 404) throw 'Alert not found';
	return alert;
}
