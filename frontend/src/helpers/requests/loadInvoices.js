export default async function loadInvoices({ invoiceId, status }) {
	let baseUrl = 'http://localhost:3000/api/invoices';
	console.log('🚀 ~ file: loadInvoices.js ~ line 3 ~ loadInvoices ~ baseUrl', baseUrl);
	if (invoiceId) baseUrl += '/' + invoiceId;
	const invoices = await fetch(baseUrl);
	const invoicesJSON = await invoices.json();
	return invoicesJSON;
}
