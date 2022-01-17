import React, { useEffect, useState } from 'react';

export const Context = React.createContext();

export function NotificationProvider({ children }) {
	const [ notifications, setNotifications ] = useState([]);
	const addNotification = (temporalNotification) => {
		setNotifications([ ...notifications, temporalNotification ]);
	};
	useEffect(() => {}, [ notifications ]);

	const value = {
		notifications,
		addNotification
	};
	return <Context.Provider value={value}>{children}</Context.Provider>;
}
