import { DateTime } from 'luxon';

export default async function createAlert({ invoiceId, since, until, message, setStatus }) {
	try {
		const response = await fetch('http://localhost:3000/api/alerts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				invoiceId,
				since: DateTime.fromISO(since),
				until: DateTime.fromISO(until),
				message
			})
		});
		const json = await response.json();
		console.log(json);
		setStatus(1);
	} catch (error) {
		setStatus(2);
	}
}
