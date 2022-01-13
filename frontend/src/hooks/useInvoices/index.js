import { useState, useEffect } from 'react';
import loadInvoices from './loadInvoices';
import statusesInvoice from './statusesInvoice';

export default function useInvoices(limit = 100, status) {
	console.log('🚀 ~ file: index.js ~ line 5 ~ useInvoices ~ status', status);
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

	return [ invoices, statusesInvoice, error ];
}
