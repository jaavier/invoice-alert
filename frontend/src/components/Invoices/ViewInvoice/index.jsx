import React from 'react';
import { useParams } from 'react-router-dom';
import Invoices from '../../../helpers/Tables/Invoices';
import useInvoice from '../../../hooks/useInvoice';

export default function ViewInvoice() {
    const { invoiceId } = useParams();
    const [invoice, error] = useInvoice(invoiceId);
    console.log("🚀 ~ file: index.jsx ~ line 9 ~ ViewInvoice ~ invoice", invoice)

    return (
        <React.Fragment>
            {
                invoice ? (
                    <div>
                        <h1 className="text-white text-3xl p-4">View Invoice</h1>
                        <Invoices invoices={[invoice]} />
                    </div>
                ) : "Not found"
            }
        </React.Fragment>
    );
}