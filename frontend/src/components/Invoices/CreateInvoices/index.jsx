import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import useApi from '../../../hooks/useApi';
import useNotification from '../../../hooks/useNotification';

export default function CreateInvoice() {
    const { post } = useApi('invoices');
    const { addNotification } = useNotification()
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");
    const [sheetNumber, setSheetNumber] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const createInvoice = async (e) => {
        e.preventDefault();
        try {
            const json = await post({
                body: {
                    receiver,
                    amount: parseFloat(amount),
                    sheetNumber: parseFloat(sheetNumber),
                    issueDate: DateTime.fromISO(issueDate),
                    dueDate: DateTime.fromISO(dueDate),
                },
                customHeaders: { 'Content-Type': 'application/json' }

            })
            addNotification({
                text: "Invoice created successfully",
                type: "success",
                timeout: 3000
            })
        } catch (error) {
            console.log("🚀 ~ file: index.jsx ~ line 35 ~ createInvoice ~ error", error)
            addNotification({
                text: error.message,
                type: "info",
            })
        }
    }

    return (
        <React.Fragment>
            <div className="py-4">
                <h1 className="text-white text-2xl font-bold">Create Invoice</h1>
            </div>
            <div className="">
                <form onSubmit={createInvoice}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Receiver
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                value={receiver}
                                onChange={(e) => setReceiver(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Sheet Number
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="number"
                                value={sheetNumber}
                                onChange={(e) => setSheetNumber(e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-4 md:w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Amount
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-4 md:w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Issue Date
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="date"
                                value={issueDate}
                                onChange={(e) => setIssueDate(e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-4 md:w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Due Date
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-full px-3 md:mb-0">
                            <button
                                className="shadow bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none text-gray-800 font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Create Invoice
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}