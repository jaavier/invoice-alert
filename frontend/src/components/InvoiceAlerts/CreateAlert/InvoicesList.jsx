import React, { useState } from 'react';
import { useInvoice } from '../../../contexts/invoices';

const Button = ({ onClick, text }) => (
    <button onClick={onClick} className="bg-green-400 p-2">
        {text}
    </button>
)

export default function InvoicesList(props) {
    const { openDetails, setOpenDetails, invoices, setSheetNumberSelected, setInvoiceId } = useInvoice();
    return <div>
        <h1>Invoices List</h1>
        {
            invoices.length > 0 && invoices.map(invoice => {
                return (
                    <div key={invoice.id} style={{
                        border: '1px solid #ccc',
                    }}>
                        {invoice.receiver}
                        {
                            openDetails === invoice.id ? (
                                <Button onClick={() => setOpenDetails(null)} text="Close" />
                            ) : (
                                <Button onClick={() => setOpenDetails(invoice.id)} text="Open" />
                            )
                        }
                        {
                            openDetails === invoice.id ? <div>
                                <ul>
                                    <li>{invoice.receiver}</li>
                                    <li>{invoice.amount}</li>
                                    <li>{invoice.sheetNumber}</li>
                                    <li>{invoice.issueDate.toLocaleString()}</li>
                                    <li>{invoice.dueDate.toLocaleString()}</li>
                                </ul>
                                <button onClick={() => {
                                    setSheetNumberSelected(invoice.sheetNumber);
                                    setInvoiceId(invoice.id);
                                }}>Select</button>

                            </div> : null
                        }
                    </div>
                );
            })
        }
    </div>

}