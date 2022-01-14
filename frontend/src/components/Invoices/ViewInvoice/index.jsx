import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Invoices from '../../../helpers/Tables/Invoices';
import useInvoice from '../../../hooks/useInvoice';
import useApi from '../../../hooks/useApi';

export default function ViewInvoice() {
    const { invoiceId } = useParams();
    const { get, response: invoice } = useApi('invoices');

    useEffect(() => {
        get(invoiceId);
    }, [])

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