import React from 'react';
import loadAlerts from '../../../helpers/requests/loadAlerts';
import { DateTime } from 'luxon';
import deleteAlert from '../../../helpers/requests/deleteAlert';
import Notification from '../../../helpers/Notification';
import useNotification from '../../../hooks/useNotification';
import { Link } from 'react-router-dom';

export default function ListAlerts(props) {
    const [alerts, setAlerts] = React.useState([]);
    const notification = useNotification({});
    const handlerDeleteAlert = async (alertId, index) => {
        if (window.confirm("Are you sure you want to delete this alert?")) {
            deleteAlert(alertId)
                .then(data => {
                    let _alerts = alerts;
                    delete _alerts[index]
                    setAlerts(_alerts);
                    notification.update({ text: `Alert #${index + 1} deleted successfully!`, type: "success" });
                })
                .catch(error => {
                    notification.update({ text: error.message, type: "error" });
                })
        }
    }

    React.useEffect(() => {
        loadAlerts().then(data => {
            setAlerts(data);
        });
    }, []);

    return (
        <React.Fragment>
            <div className="py-4">
                <h1 className="text-2xl text-white font-bold">List Alerts</h1>
            </div>
            <div className="w-full">
                <table className="w-full border-b-2 text-center text-white">
                    <thead className="border-b-2 mb-2 h-10 text-white bg-gray-500">
                        <tr className="h-8">
                            <th className="w-12">#</th>
                            <th>Invoice</th>
                            <th>Since</th>
                            <th>Until</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900">
                        {alerts.length > 0 ? alerts.map((alert, index) => (
                            <tr key={index} className="h-12 border-b-2">
                                <td>{index + 1}</td>
                                <td><Link to={`/invoices/${alert.invoiceId}`} className="underline">View #{alert.sheetNumber}</Link></td>
                                <td>{DateTime.fromISO(alert.since).toFormat('dd-MM-yyyy')}</td>
                                <td>{DateTime.fromISO(alert.until).toFormat('dd-MM-yyyy')}</td>
                                <td>{alert.message}</td>
                                <td>
                                    <div className="flex">
                                        <div className="mr-3 w-1/2">
                                            <a href="javascript:;" onClick={() => { handlerDeleteAlert(alert.id, index) }}>
                                                <i className="fas fa-times"></i>
                                            </a>
                                        </div>
                                        <div className="mr-3 w-1/2">
                                            <Link to={`/alerts/modify/${alert.id}`}>
                                                <i className="fas fa-pen"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
                <div className="mt-3">
                    {
                        !notification.hide && <Notification notification={notification} />
                    }
                </div>
            </div>
        </React.Fragment>
    );
}