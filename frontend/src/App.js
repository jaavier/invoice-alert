import CreateAlert from './components/CreateAlert';
import CreateInvoice from './components/CreateInvoices';
import ListInvoices from './components/ListInvoices';
import ListAlerts from './components/ListAlerts';
import ViewInvoice from './components/ViewInvoice';
import ViewAlert from './components/ViewAlert';
import Contacts from './components/Contacts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Layout from './components/Layout';
import loadInvoices from './helpers/requests/loadInvoices';
import { useInvoice } from './contexts/invoices';

function App() {
	const { setInvoices } = useInvoice();

	React.useEffect(() => {
		loadInvoices().then((invoices) => {
			setInvoices(invoices);
		});
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ListInvoices />} />
				<Route path="/invoices" element={<ListInvoices />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/invoices/:invoiceId" element={<ViewInvoice />} />
				<Route path="/invoices/create" element={<CreateInvoice />} />
				<Route path="/alerts" element={<ListAlerts />} />
				<Route path="/alerts/create/:invoiceId" element={<CreateAlert />} />
				<Route path="/public/invoice/:alertId/:password" element={<ViewAlert />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
