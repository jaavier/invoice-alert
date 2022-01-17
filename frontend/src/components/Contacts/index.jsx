import React, { useEffect } from 'react';
import useApi from '../../hooks/useApi';

export default function Contacts(props) {
    const { get, remove, responses } = useApi('contacts');
    useEffect(() => {
        get()
            .then(contacts => {
                console.log("🚀 ~ file: index.jsx ~ line 9 ~ useEffect ~ contacts", contacts)
            })
            .catch(error => {
                console.log('error', error)
            });
    }, [])
    return (
        <React.Fragment>
            <div className="">
                <h1 className="text-3xl underline text-white">Contacts</h1>
            </div>
            <div className="">
                <div className="flex flex-wrap -mx-3 mb-3 px-2">
                    <ul className="list-reset">
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}