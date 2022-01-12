import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Home({ children }) {
    const { pathname } = useLocation();
    const isPublic = /public/ig.test(pathname);

    return (
        <React.Fragment>
            <div className="flex">
                {isPublic ? null : <Sidebar />}
                <div className="w-full px-4 py-2 bg-slate-800">
                    {children}
                </div>
            </div>
        </React.Fragment >
    );
}