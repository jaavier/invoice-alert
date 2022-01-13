import React from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import loadAlerts from '../../../helpers/requests/loadAlerts';
import modifyAlert from '../../../helpers/requests/modifyAlert';
import Dropdown from '../../Forms/Dropdown';
import Alert from '../../../helpers/alerts/Alert';
import { useAlerts } from '../../../contexts/alerts';

const statusOptions = [{
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


export default function ModifyAlert() {
	const {
		success, setSuccess,
		showError, setShowError,
		errorMessage, setErrorMessage
	} = useAlerts();
	const { alertId } = useParams();
	const [since, setSince] = React.useState("");
	const [until, setUntil] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [status, setStatus] = React.useState("");

	const saveAlert = async () => {
		if (!since || !until || !message) {
			setErrorMessage("Please fill in all fields");
			setShowError(true);
			return;
		}
		try {
			await modifyAlert({
				alertId, since, until, message, status
			});
			setSuccess(1);
		} catch (error) {
			console.log(error);
			setSuccess(2);
		}

	}

	React.useEffect(() => {
		loadAlerts(alertId)
			.then(alert => {
				const since = DateTime.fromISO(alert.since).toFormat('yyyy-MM-dd');
				const until = DateTime.fromISO(alert.until).toFormat('yyyy-MM-dd');
				setSince(since);
				setUntil(until);
				setMessage(alert.message);
				setStatus(alert.status);
			})
			.catch(err => {
				setSuccess(2)
			})
	}, [])

	return (
		<div>
			<h1 className="text-2xl text-white">Modify Alert</h1>
			<div className="flex flex-wrap -mx-3 mb-6">
				<Input type="date" value={since} setValue={setSince} label="Since" />
				<Input type="date" value={until} setValue={setUntil} label="Until" />
				<Input type="text" value={message} setValue={setMessage} label="Message" />
				<Dropdown label="Status" options={statusOptions} value={status} setValue={setStatus} />
			</div>
			<div className="w-full">
				<Button text="Modify" onClick={saveAlert} />
			</div>
			<div className="w-full mt-2">
				{
					success === 1 &&
					<Alert>Alert modified successfully</Alert>
				}
				{
					showError &&
					<Alert type="error">{errorMessage}</Alert>
				}
			</div>
		</div>
	);
}
