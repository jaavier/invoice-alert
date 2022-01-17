import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import useApi from '../../../hooks/useApi';
import useNotification from '../../../hooks/useNotification';
import Input from '../../Forms/Input';

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
                    <div className="-mx-3 mb-2">
                        <div className="flex flex-wrap w-full md:w-full mb-6 md:mb-0">
                            <Input label="Receiver" type="text" placeholder="Receiver" value={receiver} setValue={setReceiver} size="1/2" />
                            <Input label="Sheet Number" type="text" placeholder="Sheet Number" value={sheetNumber} setValue={setSheetNumber} size="1/2" />
                            <Input label="Issue Date" type="date" placeholder="Issue Date" value={issueDate} setValue={setIssueDate} size="1/2" />
                            <Input label="Due Date" type="date" placeholder="Due Date" value={dueDate} setValue={setDueDate} size="1/2" />
                            <Input label="Amount" type="text" placeholder="Amount" value={amount} setValue={setAmount} size="1/2" />
                        </div>
                    </div>
                    <div className="w-full md:w-full md:mb-0">
                        <button
                            className="shadow bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none text-gray-800 font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}