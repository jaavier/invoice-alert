import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

const InvoiceActions = ({ invoiceId }) => {
    return (
        <div className="">
            <Link to={`/alerts/create/${invoiceId}`} className="mr-2">
                <i className="fas fa-bell"></i>
            </Link>
            <a href="" className="mr-2">
                <i className="fas fa-pen"></i>
            </a>
            <a href="" className="">
                <i className="fas fa-times"></i>
            </a>
        </div>
    )
}

export default function Details({ invoices }) {
    return (
        <React.Fragment>
            <table className="text-center p-2 w-full font-semibold">
                <thead className="border-b-2 mb-2 h-10 text-white bg-gray-500">
                    <tr>
                        <th className="w-12">#</th>
                        <th>Receiver</th>
                        <th>Sheet Number</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-white px-2 bg-slate-900">
                    {invoices.length > 0 ?
                        invoices.map((invoice, index) => (
                            <tr className="h-12 border-b-2" key={index}>
                                <td>{index + 1}</td>
                                <td>{invoice.receiver}</td>
                                <td>{invoice.sheetNumber}</td>
                                <td>{DateTime.fromISO(invoice.issueDate).toFormat('dd-MM-yyyy')}</td>
                                <td>{DateTime.fromISO(invoice.dueDate).toFormat('dd-MM-yyyy')}</td>
                                <td>{invoice.amount}</td>
                                <td>{invoice.status}</td>
                                <td>
                                    <InvoiceActions invoiceId={invoice.id} />
                                </td>
                            </tr>
                        )) : null
                    }
                </tbody>
            </table>
        </React.Fragment>
    );
}