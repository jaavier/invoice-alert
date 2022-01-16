import React, { useEffect, useState } from 'react';
import Invoices from '../../../helpers/Tables/Invoices';
import { Link } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import Filters from '../../../helpers/Tables/Filters';
import LimitPerPage from '../../../helpers/Tables/LimitPerPage';
import invoiceStatuses from '../../../hooks/useApi/invoiceStatuses';


export default function ListInvoices(props) {
	const [status, setStatus] = useState('pending');
	const [limit, setLimit] = useState(100);
	const { get, responses } = useApi('invoices');
	const invoices = responses['get'];

	useEffect(
		() => {
			get({
				params: {
					all: 'all',
					status,
					limit
				},
				queryString: {
					name: status
				}
			});
		},
		[status, limit])

	return (
		<React.Fragment>
			<div className="py-4">
				<div className="flex justify-between">
					<div className="w-1/5">
						<h1 className="text-2xl text-white font-bold">Home</h1>
					</div>
					<div className="flex">
						<Filters statuses={invoiceStatuses} status={status} setStatus={setStatus} />
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
