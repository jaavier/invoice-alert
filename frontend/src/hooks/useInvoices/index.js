import { useState, useEffect } from 'react';
import loadInvoices from '../helpers/requests/loadInvoices';

export default function useInvoices({ quantity, status }) {
	const [ invoices, setInvoices ] = useState([]);
	const loadData = async () => {
		try {
			const invoices = await loadInvoices({ quantity, status });
			setInvoices(invoices);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {}, []);
}
