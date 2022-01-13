import React from 'react';
import { useInvoice } from '../../contexts/invoices';

export default function Alert({ type, children }) {
    const { showError, setShowError } = useInvoice();
    if (!type) type = 'info';
    let color = {
        success: 'green',
        error: 'red',
        warning: 'yellow',
        info: 'blue'
    }[type];

    return (
        <div id="alert" className={`bg-${color}-700 p-3 border-${color}-300 border text-${color}-100 rounded-md font-semibold`}>
            {children}
        </div>
    )
}
