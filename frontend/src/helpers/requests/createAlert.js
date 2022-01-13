import { DateTime } from 'luxon';

export default async function createAlert({ invoiceId, since, until, message, status }) {
	const response = await fetch('http://localhost:3000/api/alerts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			invoiceId,
			since: DateTime.fromISO(since),
			until: DateTime.fromISO(until),
			message,
			status
		})
	});
	if (response.status === 400) throw new Error('Invalid request');
	const json = await response.json();
	return json;
}
