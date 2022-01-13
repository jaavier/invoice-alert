import { useState, useEffect } from 'react';
import loadAlerts from '../../helpers/requests/loadAlerts';

export default function useAlerts(limit, status) {
	const [ alerts, setAlerts ] = useState([]);
	const load = async () => {
		const data = await loadAlerts({ status, limit });
		setAlerts(data);
	};
	useEffect(
		() => {
			load();
		},
		[ status, limit ]
	);
	return alerts;
}
