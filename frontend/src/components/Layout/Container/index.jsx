import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Home({ children }) {
    const { pathname } = useLocation();
    const isPublic = /public/ig.test(pathname);

    return (
        <React.Fragment>
            <div className="w-full px-4 py-2 bg-slate-800">
                {children}
            </div>
        </React.Fragment >
    );
}