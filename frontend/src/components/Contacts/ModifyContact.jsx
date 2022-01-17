import React, { useEffect } from 'react';
import Dropdown from '../Forms/Dropdown';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import getCountries from './getCountries'
import useApi from '../../hooks/useApi';
import useNotification from '../../hooks/useNotification';
import { useParams } from 'react-router-dom';

export default function CreateContact(props) {
    const { contactId } = useParams();
    const { get, responses } = useApi('contacts');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [country, setCountry] = React.useState('');
    const { put } = useApi('contacts');
    const { addNotification } = useNotification();
    const countries = getCountries();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!country) {
            addNotification({ text: "Please select a country", type: "error" });
            return;
        }
        put({
            params: { contactId },
            body: {
                name,
                email,
                phone,
                address,
                city,
                state,
                zip,
                country
            }
        })
            .then(() => {
                addNotification({ text: "Contact modified successfully!", type: "success" });
            })
            .catch((err) => {
                addNotification({ text: "Something went wrong: " + err.message, type: "error" });
            })
    }

    useEffect(() => {
        get({
            params: { contactId }
        })
            .then(contacts => {
                setName(contacts[0].name);
                setEmail(contacts[0].email);
                setPhone(contacts[0].phone);
                setAddress(contacts[0].address);
                setCity(contacts[0].city);
                setState(contacts[0].state);
                setZip(contacts[0].zip);
                setCountry(contacts[0].country);
            })
            .catch(err => {
                window.location.href = '/contacts';
            })
    }, []);

    return <React.Fragment>
        <div className="py-4">
            <div className="w-1/5">
                <h1 className="text-2xl text-white font-bold">Modify Contact</h1>
            </div>
        </div>
        <div className="w-full">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <Input label="Name" type="text" placeholder="Name" value={name} setValue={setName} />
                    <Input label="Email" type="email" placeholder="Email" value={email} setValue={setEmail} />
                    <Input label="Phone" type="text" placeholder="Phone" value={phone} setValue={setPhone} />
                    <Dropdown label="Country" options={countries} value={country} setValue={setCountry} size="1/3" />
                    <Input label="Address" type="text" placeholder="Address" value={address} setValue={setAddress} />
                    <Input label="City" type="text" placeholder="City" value={city} setValue={setCity} />
                    <Input label="State" type="text" placeholder="State" value={state} setValue={setState} />
                    <Input label="Zip" type="text" placeholder="Zip" value={zip} setValue={setZip} />
                </div>
                <div className="w-full mb-3">
                    <Button type="primary" text="Save Contact" />
                </div>
            </form>
        </div>
    </React.Fragment>
}