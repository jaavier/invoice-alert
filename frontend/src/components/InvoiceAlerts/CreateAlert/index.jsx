import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import loadInvoices from '../../../helpers/requests/loadInvoices';
import createAlert from '../../../helpers/requests/createAlert';
import { useParams } from 'react-router-dom';
import InvoiceDetails from './InvoiceDetails';

export default function CreateAlert() {
    const { invoiceId } = useParams();
    if (!invoiceId) window.location.href = "/"
    const [since, setSince] = useState();
    const [until, setUntil] = useState();
    const [message, setMessage] = useState();
    const [status, setStatus] = useState(0);
    const [invoice, setInvoice] = useState({});
    const onSubmit = (e) => {
        e.preventDefault();
        createAlert({
            invoiceId, since, until, message, setStatus
        })
    }

    React.useEffect(() => {
        loadInvoices(invoiceId).then(data => {
            // setSince(invoices.issueDate);
            // setMessage(`${invoices.receiver} has an invoice for ${invoices.amount}`);
            setInvoice(data);
            console.log(invoice)
        });
    }, []);

    return (
        <React.Fragment>
            <div className="flex">
                <div className="w-1/3">
                    <div className="mb-5 text-center">
                        <h1 className="text-2xl text-white font-bold mb-2">Create Alert</h1>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Since
                                </label>
                                <input
                                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="date"
                                    value={since}
                                    onChange={(e) => setSince(e.target.value)}
                                />
                            </div>
                            <div className="w-full mt-4 md:w-full px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Until
                                </label>
                                <input
                                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="date"
                                    value={until}
                                    onChange={(e) => setUntil(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-full px-3 mt-4 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Message
                                </label>
                                <input
                                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            CREATE ALERT
                        </button>
                    </form>
                </div>
                <div className="w-2/3 px-4">
                    <InvoiceDetails invoice={invoice} />
                </div>
            </div>
        </React.Fragment>
    );
}