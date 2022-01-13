import React from 'react';

const Context = React.createContext();

function AlertsProvider(props) {
	const [ success, setSuccess ] = React.useState([]);
	const [ showError, setShowError ] = React.useState(false);
	const [ errorMessage, setErrorMessage ] = React.useState('');
	const value = {
		success,
		setSuccess,
		showError,
		setShowError,
		errorMessage,
		setErrorMessage
	};
	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

function useAlerts() {
	const context = React.useContext(Context);
	if (context === undefined) {
		throw new Error('useAlerts must be used within a AlertsProvider');
	}
	return context;
}

export { AlertsProvider, useAlerts };
