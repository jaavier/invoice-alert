import React from 'react';
import loadAlerts from '../../helpers/requests/loadAlerts';
import { DateTime } from 'luxon';
import Layout from '../../components/Layout';

export default function ListAlerts(props) {
    const [alerts, setAlerts] = React.useState([]);
    React.useEffect(() => {
        loadAlerts().then(data => {
            setAlerts(data);
        });
    }, []);

    return (
        <React.Fragment>
            <Layout>
                <div>
                    <h1 className="text-3xl underline text-white">List Alerts</h1>
                </div>
                <div className="mt-5 w-full">
                    <table className="w-full border-b-2 text-center text-white">
                        <thead className="border-b-2 mb-2 h-10 text-white bg-gray-500">
                            <tr className="h-8">
                                <th>Invoice</th>
                                <th>Since</th>
                                <th>Until</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-900">
                            {alerts.length && alerts.map((alert, index) => (
                                <tr key={index} className="h-12 border-b-2">
                                    <td><a href={`/invoices/${alert.invoiceId}`}>View</a></td>
                                    <td>{DateTime.fromISO(alert.since).toFormat('dd-MM-yyyy')}</td>
                                    <td>{DateTime.fromISO(alert.until).toFormat('dd-MM-yyyy')}</td>
                                    <td>{alert.message}</td>
                                    <td>
                                        <a href={`/alerts/delete/${alert.id}`}>
                                            <i class="fas fa-times"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </React.Fragment>
    );
}