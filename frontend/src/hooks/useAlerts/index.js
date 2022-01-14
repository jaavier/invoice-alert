import { useState, useEffect } from 'react';
import loadAlerts from './loadAlerts';

export default function useAlerts() {
	const [ limit, setLimit ] = useState(100);
	const [ status, setStatus ] = useState('');
	const [ alerts, setAlerts ] = useState([]);
	const load = async () => {
		const data = await loadAlerts({ status, limit });
		console.log('🚀 ~ file: index.js ~ line 10 ~ load ~ status', status);
		setAlerts(data);
	};
	useEffect(
		() => {
			load();
		},
		[ status, limit ]
	);
	return { alerts, setAlerts, status, setStatus, limit, setLimit };
}
