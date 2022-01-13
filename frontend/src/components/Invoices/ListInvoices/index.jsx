import React, { useState, useEffect } from 'react';
// import { useInvoice } from '../../../contexts/invoices';
import Invoices from '../../../helpers/tables/Invoices';
import { Link } from 'react-router-dom';
import useInvoices from '../../../hooks/useInvoices';
import Button from '../../Forms/Button';
import Dropdown from '../../Forms/Dropdown';
import Input from '../../Forms/Input';

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
	const [invoices, error] = useInvoices(limit, status)

	useEffect(() => {

	}, [limit, status])

	return (
		<React.Fragment>
			<div className="py-4">
				<div className="flex justify-between">
					<div className="w-1/5">
						<h1 className="text-2xl text-white font-bold">Home</h1>
					</div>
					<div className="flex">
						<div className="text-white mt-1 mr-2 font-semibold">Filters:</div>
						<div className="mr-2">
							<Button
								type="warning"
								text="Pending"
								onClick={() => setStatus('pending')}
								size={1}
								pressed={status === 'pending'} />
						</div>
						<div className="mr-2">
							<Button
								type="success"
								text="Paid"
								onClick={() => setStatus('paid')}
								size={1}
								pressed={status === 'paid'} />
						</div>
						<div className="mr-2">
							<Button
								type="danger"
								text="Cancelled"
								onClick={() => setStatus('cancelled')}
								size={1}
								pressed={status === 'cancelled'} />
						</div>
						<div className="mr-2">
							<Button
								type="primary"
								text="All"
								onClick={() => setStatus('')}
								size={1}
								pressed={status === ''} />
						</div>
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
			<div className="flex mt-5">
				<div className="mt-2 mr-2 text-white font-semibold">Per page:</div>
				<div className="mr-2">
					<input type="number" placeholder="Limit" value={limit} onChange={(e) => setLimit(e.target.value)} className="p-2" />
				</div>
				{/* <div className="">
					<Button type="primary" text="Apply" onClick={}/>
				</div> */}
			</div>
		</React.Fragment>
	);
}
