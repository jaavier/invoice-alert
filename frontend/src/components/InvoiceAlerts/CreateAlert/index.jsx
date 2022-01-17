import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InvoiceDetails from './InvoiceDetails';
import Dropdown from '../../Forms/Dropdown';
import useNotification from '../../../hooks/useNotification';
import alertStatuses from '../../../hooks/useAlerts/alertStatuses';
import useApi from '../../../hooks/useApi';

export default function CreateAlert() {
    const { invoiceId } = useParams();
    if (!invoiceId) window.location.href = "/"
    const { post } = useApi('alerts');
    const invoices = useApi('invoices');
    const [since, setSince] = React.useState('');
    const [until, setUntil] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [status, setStatus] = React.useState('');
    const { addNotification } = useNotification();
    const statusesList = alertStatuses
        .filter(({ text }) => text !== 'All')
        .map(({ status: value, text: label }) => ({ value, label }))

    const onSubmit = async (e) => {
        e.preventDefault();
        post({ invoiceId, since, until, message, status }, {
            'Content-Type': 'application/json'
        })
            .then(data => {
                addNotification({ text: "Alert created successfully!", type: "success" });
                setSince("");
                setUntil("");
                setMessage("");
                setStatus("pending");
            }).catch(error => {
                console.log("🚀 ~ file: index.jsx ~ line 34 ~ onSubmit ~ error", error)
                addNotification({ text: "Something went wrong!", type: "error" });
            })
    }

    useEffect(() => {
        invoices.get(invoiceId)
    }, [])

    return (
        <React.Fragment>
            <div className="flex">
                <div className="w-1/3">
                    <div className="py-4">
                        <h1 className="text-2xl text-white font-bold">Create Alert</h1>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-3">
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
                            <Dropdown label="Status" options={statusesList} value={status} setValue={setStatus} size="full" />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            CREATE ALERT
                        </button>
                    </form>
                </div>
                <div className="w-2/3 px-4">
                    <InvoiceDetails invoice={invoices.responses.get} />
                </div>
            </div>
        </React.Fragment>
    );
}