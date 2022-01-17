import React, { useState, useEffect } from 'react';
import useNotification from './index';

const color = {
    success: 'green',
    error: 'red',
    warning: 'yellow',
    info: 'blue'
};


const Box = ({ type, text, timeout = 3000 }) => {
    const [hide, setHide] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setHide(true);
        }, timeout)
        return () => clearTimeout(timer)
    }, []);
    return !hide && <div onClick={() => setHide(true)} className="mb-1">
        <div className={`bg-${color[type]}-700 p-3 border-${color[type]}-300 border text-${color[type]}-100 rounded-md font-semibold flex relative`}>
            <div className="flex">
                <div className="">
                    {text}
                </div>
                <div className="absolute right-5">
                    <button onClick={() => {
                        setHide(true)
                    }}>&times;</button>
                </div>
            </div>
        </div>
    </div>
}

export default function Notification() {
    const { notifications } = useNotification();
    return <div className="absolute top-5 right-5 w-1/3">
        {
            notifications.length > 0 && (
                notifications.filter(notification => !notification.hide)
                    .map((props, index) => {
                        return <Box {...props} key={index} />
                    })
            )}
    </div>
}
