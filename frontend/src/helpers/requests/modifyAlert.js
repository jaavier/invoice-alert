export default async function modifyAlert({ alertId, since, until, message, status }) {
	try {
		const response = await fetch(`http://localhost:3000/api/alerts/${alertId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				since,
				until,
				message,
				status
			})
		});
		const data = await response.json();
		return data;
	} catch (e) {}
}
