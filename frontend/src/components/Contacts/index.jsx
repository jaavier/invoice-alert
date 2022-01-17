import React, { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import useNotification from '../../hooks/useNotification';
import { Link } from 'react-router-dom';

export default function Contacts(props) {
    const { get, remove, responses } = useApi('contacts');
    const { addNotification } = useNotification();

    const deleteContact = (contactId) => {
        if (window.confirm("Do you want to delete this contact? ")) {
            remove({
                params: { contactId }
            })
                .then(() => {
                    addNotification({ text: "Contact deleted successfully!", type: "success" });
                })
                .catch(err => {
                    console.log(err);
                    addNotification({ text: "Error deleting contact!", type: "error" });
                });
        }
    }

    useEffect(() => {
        get()
            .then(contacts => { })
            .catch(error => { });
    }, [responses.delete])

    return (
        <React.Fragment>
            <div className="py-4">
                <div className="w-1/5">
                    <h1 className="text-2xl text-white font-bold">Contacts</h1>
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-wrap -mx-3 mb-3 px-2">
                    <table className="table-auto w-full bg-slate-900 text-white font-semibold">
                        <thead className="border">
                            <tr>
                                <th className="px-2 py-2">Name</th>
                                <th className="px-2 py-2">Email</th>
                                <th className="px-2 py-2">Phone</th>
                                <th className="px-2 py-2">Address</th>
                                <th className="px-2 py-2">City</th>
                                <th className="px-2 py-2">State</th>
                                <th className="px-2 py-2">Zip</th>
                                <th className="px-2 py-2">Country</th>
                                <th className="px-2 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                responses.get && responses.get.map(contact => {
                                    return (
                                        <tr key={contact.id}>
                                            <td className="border px-2 py-2">{contact.name}</td>
                                            <td className="border px-2 py-2">{contact.email}</td>
                                            <td className="border px-2 py-2">{contact.phone}</td>
                                            <td className="border px-2 py-2">{contact.address}</td>
                                            <td className="border px-2 py-2">{contact.city}</td>
                                            <td className="border px-2 py-2">{contact.state}</td>
                                            <td className="border px-2 py-2">{contact.zip}</td>
                                            <td className="border px-2 py-2">{contact.country}</td>
                                            <td className="border px-2 py-2">
                                                <div className="">
                                                    <button className="mr-2" onClick={() => deleteContact(contact.id)}>
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                    <Link to={`/contacts/${contact.id}`} className="mr-2">
                                                        <i className="fas fa-pen"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
}
