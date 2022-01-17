import React from 'react';

export default function Dropdown({ label, options, value, setValue, size = "1/2" }) {
    options = [{
        value: 'Select one',
        label: 'Select one',
        hidden: true
    },
    ...options]
    return (
        <div className={`w-full md:w-${size} px-3 md:mb-0`}>
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                {label}
            </label>
            <div className="mb-3">
                <select
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={(e) => setValue(e.target.value)}
                    defaultValue='Select one'
                >
                    {options.map((option) => (
                        <option key={option.value} {...option}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

        </div >
    )
}