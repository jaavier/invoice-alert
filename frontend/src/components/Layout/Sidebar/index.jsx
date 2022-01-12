import React from 'react';
import { Link } from 'react-router-dom'

export default function SiderbarDark() {
    const [menu, setMenu] = React.useState();

    return <div className="w-1/6 bg-slate-900 text-white h-screen">
        <div className="bg-gray-700 p-4">
            <h1 className="text-center">Welcome</h1>
        </div>
        <ul className="px-2">
            <li className="py-2 border-gray-800">
                <Link
                    to="/invoices"
                    className="text-white text-sm font-semibold"
                >
                    Home
                </Link>
            </li>
            <li className="py-2 border-gray-800">
                <Link
                    to="/invoices/create"
                    className="text-white text-sm font-semibold"
                >
                    Create Invoice
                </Link>
            </li>
            <li
                onClick={() => setMenu(menu === 'alerts' ? null : 'alerts')}
                className="py-2"
            >
                <button
                    className="text-white text-sm font-semibold"
                >
                    Alerts
                </button>
                {
                    menu === 'alerts' && (
                        <ul className="px-4">
                            <li className="text-white text-sm pt-2 font-semibold">
                                <Link to="/alerts">View All</Link>
                            </li>
                            <li className="text-white text-sm pt-2 font-semibold">
                                <Link to="/alerts/stats">Statistics</Link>
                            </li>
                        </ul>
                    )
                }
            </li>
            <li className="py-2">
                <Link
                    to="/contacts"
                    className="text-white text-sm font-semibold"
                >
                    Contacts
                </Link>
            </li>
            <li className="py-2">
                <Link
                    to="/settings"
                    className="text-white text-sm font-semibold"
                >
                    Settings
                </Link>
            </li>

        </ul>
    </div>

}