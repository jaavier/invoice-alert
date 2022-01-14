import { useState, useEffect } from 'react';
import loadInvoices from './loadInvoices';
import invoiceStatuses from './invoiceStatuses';

export default function useInvoices(limit = 100, status) {
	const [ invoices, setInvoices ] = useState([]);
	const [ error, setError ] = useState(null);
	const loadData = async () => {
		try {
			const invoices = await loadInvoices({ limit, status });
			setInvoices(invoices);
		} catch (e) {
			setError(e);
		}
	};
	useEffect(
		() => {
			loadData();
		},
		[ status, limit ]
	);

	return [ invoices, invoiceStatuses, error ];
}
