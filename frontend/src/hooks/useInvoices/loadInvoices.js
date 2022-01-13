export default async function loadInvoices({ invoiceId, status }) {
	let baseUrl = 'http://localhost:3000/api/invoices';
	if (invoiceId) baseUrl += '/' + invoiceId;
	if (status) baseUrl += '?status=' + status;
	const invoices = await fetch(baseUrl);
	const invoicesJSON = await invoices.json();
	return invoicesJSON;
}
