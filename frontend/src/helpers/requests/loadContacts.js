export default async function loadContacts() {
	try {
		const response = await fetch('http://localhost:3000/api/contacts');
		const contacts = await response.json();
		return contacts;
	} catch (err) {
		console.log('err', err);
	}
}
