export default async function deleteAlert(alertId) {
	const response = await fetch(`http://localhost:3000/api/alerts/${alertId}`, {
		method: 'DELETE'
	});
	if (response.status === 404) throw new Error('Alert not found');
	const data = await response.json();
	return data;
}
