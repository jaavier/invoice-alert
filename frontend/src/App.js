import React from 'react';
import CreateAlert from './components/InvoiceAlerts/CreateAlert';
import ListAlerts from './components/InvoiceAlerts/ListAlerts';
import ViewAlert from './components/InvoiceAlerts/ViewAlert';
import ModifyAlert from './components/InvoiceAlerts/ModifyAlert';
import ViewInvoice from './components/Invoices/ViewInvoice';
import CreateInvoice from './components/Invoices/CreateInvoices';
import ListInvoices from './components/Invoices/ListInvoices';
import Contacts from './components/Contacts';
import Container from './components/Layout/Container';
import Sidebar from './components/Layout/Sidebar';
import loadInvoices from './helpers/requests/loadInvoices';
import { useInvoice } from './contexts/invoices';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	const { setInvoices } = useInvoice();

	React.useEffect(() => {
		loadInvoices().then((invoices) => {
			setInvoices(invoices);
		});
	}, []);

	return (
		<div className="flex">
			<BrowserRouter>
				<Sidebar />
				<Container>
					<Routes>
						<Route path="/" element={<ListInvoices />} />
						<Route path="/invoices" element={<ListInvoices />} />
						<Route path="/contacts" element={<Contacts />} />
						<Route path="/invoices/:invoiceId" element={<ViewInvoice />} />
						<Route path="/invoices/create" element={<CreateInvoice />} />
						<Route path="/alerts" element={<ListAlerts />} />
						<Route path="/alerts/create/:alertId" element={<CreateAlert />} />
						<Route path="/alerts/modify/:alertId" element={<ModifyAlert />} />
						<Route path="/public/invoice/:alertId/:password" element={<ViewAlert />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</div>
	);
}

export default App;
