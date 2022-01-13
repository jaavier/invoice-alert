import React from 'react';

const Context = React.createContext();

function CreateAlertProvider({ children }) {
	const [ since, setSince ] = React.useState('');
	const [ until, setUntil ] = React.useState('');
	const [ message, setMessage ] = React.useState('');
	const [ status, setStatus ] = React.useState('');
	const [ invoice, setInvoice ] = React.useState({
		sheetNumber: 0,
		receiver: '',
		amount: 0
	});
	const value = {
		since,
		until,
		message,
		status,
		invoice,
		setSince,
		setUntil,
		setMessage,
		setStatus,
		setInvoice
	};
	return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useCreateAlert() {
	return React.useContext(Context);
}

export { CreateAlertProvider, useCreateAlert };
