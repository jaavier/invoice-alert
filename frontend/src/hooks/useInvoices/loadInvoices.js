export default async function loadInvoices({ invoiceId, limit, status }) {
	let url = 'http://localhost:3000/api/invoices';
	if (invoiceId) {
		url += '/' + invoiceId;
	} else {
		if (status) url += '?status=' + status;
		if (status && limit) url += '&limit=' + limit;
		if (!status && limit) url += '?limit=' + limit;
	}
	const invoices = await fetch(url);
	const invoicesJSON = await invoices.json();
	return invoicesJSON;
}
