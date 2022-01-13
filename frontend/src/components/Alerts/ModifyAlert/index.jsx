import React from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import loadAlerts from '../../../helpers/requests/loadAlerts';
import modifyAlert from '../../../helpers/requests/modifyAlert';
import Dropdown from '../../Forms/Dropdown';

export default function ModifyAlert() {
	const { alertId } = useParams();
	const [since, setSince] = React.useState("");
	const [until, setUntil] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [status, setStatus] = React.useState("");
	const saveAlert = async () => {
		const data = await modifyAlert({
			alertId, since, until, message, status
		});
		console.log(data);
	}

	React.useEffect(() => {
		loadAlerts(alertId).then(alert => {
			console.log("🚀 ~ file: index.jsx ~ line 24 ~ loadAlerts ~ alert", alert)
			const since = DateTime.fromISO(alert.since).toFormat('yyyy-MM-dd');
			const until = DateTime.fromISO(alert.until).toFormat('yyyy-MM-dd');
			setSince(since);
			setUntil(until);
			setMessage(alert.message);
			setStatus(alert.status);
		})
	}, [])
	const options = [{
		value: "answered",
		label: "Answered"
	}, {
		value: "cancelled",
		label: "Cancelled"
	}, {
		value: "expired",
		label: "Expired"
	}, {
		value: "pending",
		label: "Pending"
	}, {
		value: "paid",
		label: "Paid"
	}]

	const onChange = (e) => setStatus(e.target.value)

	return (
		<div>
			<h1 className="text-2xl text-white">Modify Alert</h1>
			<div className="flex flex-wrap -mx-3 mb-6">
				<Input type="date" value={since} setValue={setSince} label="Since" />
				<Input type="date" value={until} setValue={setUntil} label="Until" />
				<Input type="text" value={message} setValue={setMessage} label="Message" />
				<Input type="text" value={status} setValue={setStatus} label="Status" />
				<Dropdown label="Status" options={options} defaultValue={status} onChange={onChange} />
			</div>
			<div className="">
				<Button text="Modify" onClick={saveAlert} />
			</div>
		</div>
	);
}
