import React from 'react';
import { useAlerts } from '../../contexts/alerts';

export default function Alert({ type, children }) {
    const { success, setSuccess, showError, setShowError } = useAlerts();
    if (!type) type = 'info';
    let color = {
        success: 'green',
        error: 'red',
        warning: 'yellow',
        info: 'blue'
    }[type];

    React.useEffect(() => {
        let timeout = setTimeout(() => {
            setShowError(false);
            setSuccess(0);
        }, 8000);
        return () => clearTimeout(timeout);
    }, [showError, success]);

    return (
        <div id="alert" className={`bg-${color}-700 p-3 border-${color}-300 border text-${color}-100 rounded-md font-semibold`}>
            {children}
        </div>
    )
}
