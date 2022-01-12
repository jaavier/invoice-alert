import React, { useState, useEffect } from 'react';
import { useInvoice } from '../../contexts/invoices';
import Invoices from '../../helpers/tables/Invoices';
import Layout from '../../components/Layout';

const InvoiceActions = ({ invoiceId }) => {
	return (
		<div>
			<a href={`/alerts/create/${invoiceId}`} className="mr-2">
				<i class="fas fa-bell"></i>
			</a>
			<a className="">
				<i class="fas fa-times"></i>
			</a>
		</div>
	)
}

export default function ListInvoices() {
	const { invoices } = useInvoice();
	return (
		<React.Fragment>
			<Layout>
				<h1 className="text-white text-3xl mb-2">All Invoices</h1>
				<div className="mt-5 w-full">
					<Invoices invoices={invoices} />
					{invoices.length === 0 && (
						<div className="text-center text-white mt-2 font-semibold">
							<a href="/invoices/create">
								Create your first invoice
							</a>
						</div>
					)}
				</div>
			</Layout>
		</React.Fragment>
	);
}
