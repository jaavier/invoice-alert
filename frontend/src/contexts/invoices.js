import React from 'react';

const Context = React.createContext();

function InvoicesProvider(props) {
	const [ invoices, setInvoices ] = React.useState([]);
	const [ openDetails, setOpenDetails ] = React.useState();
	const [ invoiceId, setInvoiceId ] = React.useState();
	const [ sheetNumberSelected, setSheetNumberSelected ] = React.useState();
	const [ showError, setShowError ] = React.useState(false);
	const value = {
		invoices,
		setInvoices,
		openDetails,
		setOpenDetails,
		invoiceId,
		setInvoiceId,
		sheetNumberSelected,
		setSheetNumberSelected,
		showError,
		setShowError
	};
	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

function useInvoice() {
	const context = React.useContext(Context);
	if (context === undefined) {
		throw new Error('useInvoice must be used within a InvoicesProvider');
	}
	return context;
}

export { InvoicesProvider, useInvoice };
