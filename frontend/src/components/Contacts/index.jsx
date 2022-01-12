import React from 'react';
import { DateTime } from 'luxon';

export default function Contacts(props) {
    const { invoices = [] } = props;
    return (
        <React.Fragment>
            <div className="">
                <h1 className="text-3xl underline text-white">Contacts</h1>
            </div>
            <div className="">
                {/* <table className="text-center p-2 w-full">
                    <thead className="border-b-2 mb-2 h-10 text-white bg-gray-500">
                        <tr>
                            <th>#</th>
                            <th>Receiver</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-white px-2 bg-slate-900">
                        {invoices.length > 0 &&
                            invoices.map((invoice, index) => (
                                <tr className="h-12 border-b-2">
                                    <td>{index + 1}</td>
                                    <td>{invoice.receiver}</td>
                                    <td>{DateTime.fromISO(invoice.issueDate).toFormat('dd-MM-yyyy')}</td>
                                    <td>{DateTime.fromISO(invoice.dueDate).toFormat('dd-MM-yyyy')}</td>
                                    <td>{invoice.amount}</td>
                                    <td>
                                        <InvoiceActions invoiceId={invoice.id} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> */}
            </div>
        </React.Fragment>
    );
}