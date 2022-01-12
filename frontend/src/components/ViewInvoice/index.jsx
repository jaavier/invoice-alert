import React from 'react';
import { useParams } from 'react-router-dom';
import loadInvoices from '../../helpers/requests/loadInvoices';
import Invoices from '../../helpers/tables/Invoices';
import Layout from '../../components/Layout';

export default function ViewInvoice() {
    const { invoiceId } = useParams();
    const [invoice, setInvoice] = React.useState();

    React.useEffect(() => {
        if (invoiceId)
            loadInvoices(invoiceId).then(invoice => {
                setInvoice([invoice])
            });
    }, [])
    return (
        <React.Fragment>
            <Layout>
                {
                    invoice ? (
                        <div>
                            <h1 className="text-white text-3xl mb-2">View Invoice</h1>
                            <Invoices invoices={invoice} />
                        </div>
                    ) : "Not found"
                }
            </Layout>
        </React.Fragment>
    );
}