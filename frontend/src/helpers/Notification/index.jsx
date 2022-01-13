import React from 'react';

export default function Notification({ notification }) {
    const { text, type, hide, update, autoClose } = notification;
    let color = {
        success: 'green',
        error: 'red',
        warning: 'yellow',
        info: 'blue'
    }[type];

    React.useEffect(() => {
        if (autoClose) {
            let timeout = setTimeout(() => {
                update({ hide: true });
            }, autoClose * 1000);
            return () => clearTimeout(timeout);
        }
    }, [text, type]);

    return !hide ? (
        <div className={`bg-${color}-700 p-3 border-${color}-300 border text-${color}-100 rounded-md font-semibold`}>
            {text}
        </div>
    ) : null
}
