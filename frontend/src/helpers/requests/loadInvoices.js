export default async function loadInvoices(uuid) {
	let baseUrl = 'http://localhost:3000/api/invoices';
	if (uuid) baseUrl += '/' + uuid;
	const invoices = await fetch(baseUrl);
	const invoicesJSON = await invoices.json();
	return invoicesJSON;
}
