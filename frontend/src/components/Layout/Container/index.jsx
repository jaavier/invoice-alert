import React, { useEffect } from 'react';
import Notification from '../../../hooks/useNotification/Notification';

export default function Home({ children }) {
    return (
        <React.Fragment>
            <div className="w-full min-h-screen w-full px-4 bg-slate-800 relative">
                {children}
                <Notification />
            </div>
        </React.Fragment >
    );
}