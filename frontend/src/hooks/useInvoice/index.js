import { useEffect, useState } from 'react';
import loadInvoice from './loadInvoice';

export default function useInvoice(invoiceId) {
	const [ invoice, setInvoice ] = useState({});
	const [ error, setError ] = useState(undefined);
	const load = async () => {
		try {
			const data = await loadInvoice(invoiceId);
			setInvoice(data);
		} catch (err) {
			setError(err);
		}
	};
	useEffect(() => {
		load();
	}, []);
	return [ invoice, error ];
}
