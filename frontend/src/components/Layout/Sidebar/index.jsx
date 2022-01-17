import React from 'react';
import { Link, useLocation } from 'react-router-dom'

export default function SiderbarDark() {
    const [menu, setMenu] = React.useState();
    const isPublic = useLocation().pathname.includes('public');
    return !isPublic && <div className="bg-slate-900 min-h-screen w-1/5 text-white">
        <div className="bg-gray-700 p-4">
            <h1 className="text-center text-2xl">Welcome</h1>
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

            <li
                onClick={() => setMenu(menu === 'contacts' ? null : 'contacts')}
                className="py-2"
            >
                <button
                    className="text-white text-sm font-semibold"
                >
                    Contacts
                </button>
                {
                    menu === 'contacts' && (
                        <ul className="px-4">
                            <li className="text-white text-sm pt-2 font-semibold">
                                <Link to="/contacts">View All</Link>
                            </li>
                            <li className="text-white text-sm pt-2 font-semibold">
                                <Link to="/contacts/create">Create Contact</Link>
                            </li>
                        </ul>
                    )
                }
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