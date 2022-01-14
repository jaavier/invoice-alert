import React, { useState, useEffect } from 'react';
// import { useInvoice } from '../../../contexts/invoices';
import Invoices from '../../../helpers/Tables/Invoices';
import { Link } from 'react-router-dom';
import useInvoices from '../../../hooks/useInvoices';
import Filters from '../../../helpers/Tables/Filters';
import LimitPerPage from '../../../helpers/Tables/LimitPerPage';

const InvoiceActions = ({ invoiceId }) => {
	return (
		<div>
			<Link to={`/alerts/create/${invoiceId}`} className="mr-2">
				<i className="fas fa-bell"></i>
			</Link>
			<a className="">
				<i className="fas fa-times"></i>
			</a>
		</div>
	)
}


export default function ListInvoices(props) {
	const [limit, setLimit] = useState(100);
	const [status, setStatus] = useState('');
	const [invoices, statusesInvoice, error] = useInvoices(limit, status)

	return (
		<React.Fragment>
			<div className="py-4">
				<div className="flex justify-between">
					<div className="w-1/5">
						<h1 className="text-2xl text-white font-bold">Home</h1>
					</div>
					<div className="flex">
						<Filters statuses={statusesInvoice} status={status} setStatus={setStatus} />
					</div>
				</div>
			</div>
			<div className="w-full">
				{
					invoices.length > 0 ? <Invoices invoices={invoices} />
						: (
							<div className="text-center text-white mt-2 font-semibold">
								<Link to="/invoices/create">
									Create your first <u>{status}</u> invoice
								</Link>
							</div>
						)}
			</div>
			<div className="mt-5">
				<LimitPerPage limit={limit} setLimit={setLimit} />
			</div>
		</React.Fragment>
	);
}
