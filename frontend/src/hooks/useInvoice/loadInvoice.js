export default async function loadInvoice(invoiceId) {
	if (!invoiceId) return;
	let url = 'http://localhost:3000/api/invoices/' + invoiceId;
	const invoices = await fetch(url);
	const invoicesJSON = await invoices.json();
	return invoicesJSON;
}
