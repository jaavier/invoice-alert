import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';

export default function ResumeAlerts() {
    const { contactId } = useParams();
    const { get } = useApi('contacts');
    useEffect(() => {
        get({
            params: { contactId, alerts: 'alerts' }
        })
            .then((alerts) => {
                console.log("🚀 ~ file: ResumeAlerts.jsx ~ line 11 ~ .then ~ alerts", alerts)

            })
            .catch((err) => {
                console.log("🚀 ~ file: ResumeAlerts.jsx ~ line 16 ~ .catch ~ err", err)
            })
    }, [])
    return <React.Fragment>
        <div className="py-4">
            <div className="w-1/5">
                <h1 className="text-2xl text-white font-bold">Resume Alerts</h1>
            </div>
        </div>
        <div className="w-full">

        </div>
    </React.Fragment>
}