import React from 'react';

export default function SiderbarDark() {
    const [menu, setMenu] = React.useState();

    return <div className="w-1/6 bg-slate-900 text-white h-screen">
        <div className="bg-gray-700 p-4">
            <h1 className="text-center">Welcome</h1>
        </div>
        <ul className="px-2">
            <li className="py-2 border-gray-800">
                <a
                    href="/invoices"
                    className="text-white text-sm font-semibold"
                >
                    Home
                </a>
            </li>
            <li className="py-2 border-gray-800">
                <a
                    href="/invoices/create"
                    className="text-white text-sm font-semibold"
                >
                    Create Invoice
                </a>
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
                                <a href="/alerts">View All</a>
                            </li>
                            <li className="text-white text-sm pt-2 font-semibold">
                                <a href="/alerts/create">Create Alert</a>
                            </li>
                        </ul>
                    )
                }
            </li>
            <li className="py-2">
                <a
                    href="/contacts"
                    className="text-white text-sm font-semibold"
                >
                    Contacts
                </a>
            </li>
            <li className="py-2">
                <a
                    href="/settings"
                    className="text-white text-sm font-semibold"
                >
                    Settings
                </a>
            </li>

        </ul>
    </div>

}