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
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateContact from './components/Contacts/CreateContact';
import ModifyContact from './components/Contacts/ModifyContact';
import ResumeAlerts from './components/Contacts/ResumeAlerts';

function App() {
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
						<Route path="/contacts" element={<Contacts />} />
						<Route path="/contacts/create" element={<CreateContact />} />
						<Route path="/contacts/:contactId" element={<ModifyContact />} />
						<Route path="/contacts/:contactId/alerts" element={<ResumeAlerts />} />
						<Route path="/alerts" element={<ListAlerts />} />
						<Route path="/alerts/create" element={<Navigate replace to="/" />} />
						<Route path="/alerts/create/:invoiceId" element={<CreateAlert />} />
						<Route path="/alerts/modify/:alertId" element={<ModifyAlert />} />
						<Route path="/public/invoice/:alertId/:password" element={<ViewAlert />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</div>
	);
}

export default App;
