import React from 'react';
import { DateTime } from 'luxon';

export default function InvoiceDetails(props) {
    const { sheetNumber, receiver, amount, issueDate, dueDate, message } = props.invoice;
    return (
        <div>
            <div className="mb-5 text-center">
                <h1 className="text-xl text-white font-bold mb-2">Invoice Details (read only)</h1>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 px-2">
                <div className="w-full md:w-full px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Receiver
                    </label>
                    <input
                        className="appearance-none block w-full bg-slate-800 text-white border rounded py-3 px-4 leading-tight outline-none border-gray-500"
                        type="text"
                        value={receiver}
                        readOnly
                    />
                </div>
                <div className="w-full mt-4 md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Sheet Number
                    </label>
                    <input
                        className="appearance-none block w-full bg-slate-800 text-white border rounded py-3 px-4 leading-tight outline-none border-gray-500"
                        type="text"
                        value={sheetNumber}
                        readOnly
                    />
                </div>
                <div className="w-full mt-4 md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Amount
                    </label>
                    <input
                        className="appearance-none block w-full bg-slate-800 text-white border rounded py-3 px-4 leading-tight outline-none border-gray-500"
                        type="text"
                        value={amount}
                        readOnly
                    />
                </div>
                <div className="w-full mt-4 md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Issue Date
                    </label>
                    <input
                        className="appearance-none block w-full bg-slate-800 text-white border rounded py-3 px-4 leading-tight outline-none border-gray-500"
                        type="text"
                        value={DateTime.fromISO(issueDate).toFormat('dd LLL yyyy')}
                        readOnly
                    />
                </div>
                <div className="w-full mt-4 md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Due Date
                    </label>
                    <input
                        className="appearance-none block w-full bg-slate-800 text-white border rounded py-3 px-4 leading-tight outline-none border-gray-500"
                        type="text"
                        value={DateTime.fromISO(dueDate).toFormat('dd LLL yyyy')}
                        readOnly
                    />
                </div>
                {
                    message &&
                    <div className="w-full mt-4 md:w-full px-3">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Message from issuer
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-slate-800 text-white border rounded py-3 px-4 leading-tight outline-none border-gray-500"
                            value={message}
                            readOnly
                        />
                    </div>
                }
            </div>
        </div>
    )
}