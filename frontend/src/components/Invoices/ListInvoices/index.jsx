import React, { useState, useEffect } from 'react';
import { useInvoice } from '../../../contexts/invoices';
import Invoices from '../../../helpers/tables/Invoices';
import { Link } from 'react-router-dom';

const InvoiceActions = ({ invoiceId }) => {
	return (
		<div>
			<Link href={`/alerts/create/${invoiceId}`} className="mr-2">
				<i className="fas fa-bell"></i>
			</Link>
			<Link className="">
				<i className="fas fa-times"></i>
			</Link>
		</div>
	)
}

export default function ListInvoices() {
	const { invoices } = useInvoice();
	return (
		<React.Fragment>
			<div className="py-4">
				<h1 className="text-2xl text-white font-bold">All Invoices</h1>
			</div>
			<div className="w-full">
				{
					invoices.length > 0 ? <Invoices invoices={invoices} />
						: (
							<div className="text-center text-white mt-2 font-semibold">
								<Link to="/invoices/create">
									Create your first invoice
								</Link>
							</div>
						)}
			</div>
		</React.Fragment>
	);
}
