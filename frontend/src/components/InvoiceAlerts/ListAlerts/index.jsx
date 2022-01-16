import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import Filters from '../../../helpers/Tables/Filters';
import alertStatuses from '../../../hooks/useAlerts/alertStatuses';
import LimitPerPage from '../../../helpers/Tables/LimitPerPage';
import useApi from '../../../hooks/useApi';
import { useNotification } from '../../../contexts/useNotification';

export default function ListAlerts(props) {
    const { addNotification } = useNotification();
    const { get, remove, params, responses } = useApi('alerts');

    const handlerDeleteAlert = async (alertId, index) => {
        if (window.confirm("Do you want to delete this alert? ")) {
            await remove(alertId);
            addNotification({ text: "Alert deleted successfully!", type: "success" });
        }
    }

    useEffect(
        () => {
            get();
        },
        [responses['delete'], params.status, params.limit]
    );


    return (
        <React.Fragment>
            <div className="py-4">
                <div className="flex justify-between">
                    <div className="w-1/5">
                        <h1 className="text-2xl text-white font-bold">Alerts</h1>
                    </div>
                    <div className="flex">
                        <Filters statuses={alertStatuses} status={params.status} setStatus={params.setStatus} />
                    </div>
                </div>
            </div>
            <div className="w-full">
                <table className="w-full border-b-2 text-center text-white font-semibold">
                    <thead className="border-b-2 mb-2 h-10 text-white bg-gray-500">
                        <tr className="h-8">
                            <th className="w-12">#</th>
                            <th>Invoice</th>
                            <th>Since</th>
                            <th>Until</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900">
                        {responses['get'].length > 0 ? responses['get'].map((alert, index) => (
                            <tr key={index} className="h-12 border-b-2">
                                <td>{index + 1}</td>
                                <td><Link to={`/invoices/${alert.invoiceId}`} className="underline">View #{alert.sheetNumber}</Link></td>
                                <td>{DateTime.fromISO(alert.since).toFormat('dd-MM-yyyy')}</td>
                                <td>{DateTime.fromISO(alert.until).toFormat('dd-MM-yyyy')}</td>
                                <td>{alert.message}</td>
                                <td>{alert.status}</td>
                                <td>
                                    <div className="flex">
                                        <div className="mr-3 w-1/2">
                                            <button onClick={() => { handlerDeleteAlert(alert.id, index) }}>
                                                <i className="fas fa-times"></i>
                                            </button>
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
                {
                    responses['get'].length === 0 ? <div className="text-center text-white mt-2 font-semibold">
                        <Link to="/alerts">
                            Create your first <u>{params.status}</u> alert
                        </Link>
                    </div>
                        : null
                }
            </div>
            <div className="mt-5">
                <LimitPerPage limit={params.limit} setLimit={params.setLimit} />
            </div>

        </React.Fragment>
    );
}