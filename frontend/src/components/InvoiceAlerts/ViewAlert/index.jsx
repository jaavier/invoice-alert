import React from 'react';
import { useParams } from 'react-router-dom';
import loadAlerts from '../../../helpers/requests/loadAlerts';
import unlockAlert from '../../../helpers/requests/unlockAlert';
import InvoiceDetails from '../CreateAlert/InvoiceDetails';

const ShowAlert = ({ data }) => {
    console.log("🚀 ~ file: index.jsx ~ line 9 ~ ShowAlert ~ data", data)
    if (!data || !data.alert) return null
    return (
        <div>
            <div className="mb-5">
                You can see this alert only once and it will be automatically deleted after you close this page.
            </div>
            <div>
                <InvoiceDetails invoice={{ ...data.invoice, message: data.alert.message }} />
            </div>
            <hr />
            <div className="my-5">
                <div>
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Attach proof
                    </label>
                </div>
                <div>
                    <input type="file" />
                </div>
            </div>
            <div className="mb-5">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Message
                </label>
                <textarea rows="10" cols="50"
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold p-1 rounded"
                />
            </div>
            <div className="mb-5">
                <button
                    className="bg-green-500 hover:bg-green-700 text-green-100 font-bold py-2 px-4 rounded"
                >
                    Mark as paid
                </button>
            </div>
        </div >
    );
}

const AlertError = () => {
    return (
        <div className="text-center pb-5">
            This alert doesn't exists or you don't have permission to see it.
        </div>
    )
}

export default function ViewAlert() {
    const { alertId, password } = useParams();
    const [data, setData] = React.useState();
    const [error, setError] = React.useState();
    const [height, setHeight] = React.useState('full')

    React.useEffect(() => {
        if (alertId && password) {
            unlockAlert(alertId, password).then(data => {
                setData(data);
            }).catch(e => {
                setError(e);
                setHeight('screen')
            });
        }
    }, []);

    return (
        <React.Fragment>
            <div className={`w-full px-64 bg-slate-800 min-h-screen py-10`}>
                <div className="mx-auto container bg-slate-900 rounded-md">
                    <div className="border border-slate-500 px-32 rounded-lg shadow-sm shadow-white">
                        <div className="py-5">
                            <h1 className="text-white text-3xl mb-2 text-center">Important!</h1>
                        </div>
                        <div className="text-white text-center pb-3 h-full">
                            {
                                error && <AlertError error={error} />
                            }
                            {
                                data && <ShowAlert data={data} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}