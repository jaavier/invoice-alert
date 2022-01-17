import React from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import Dropdown from '../../Forms/Dropdown';
import alertStatuses from '../../../hooks/useAlerts/alertStatuses';
import useApi from '../../../hooks/useApi';
import { useNotification } from '../../../contexts/useNotification';

export default function ModifyAlert() {
	const { addNotification } = useNotification();
	const { alertId } = useParams();
	const [since, setSince] = React.useState("");
	const [until, setUntil] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [status, setStatus] = React.useState("");
	const statusOptions = alertStatuses
		.filter(({ text }) => text !== 'All')
		.map(({ status: value, text: label }) => ({ value, label }))
	const { get, put, remove } = useApi('alerts');
	const timeout = 5000;

	const saveAlert = async () => {
		if (!since || !until || !message) {
			addNotification({ text: "Please fill in all fields", type: "error", timeout });
			return;
		}
		try {
			await put({
				params: { alertId },
				body: { since, until, message, status },
				customHeaders: { 'Content-Type': 'application/json' }
			})
			addNotification({ text: 'Alert modified successfully!', type: 'success', timeout });

		} catch (error) {
			console.log(error);
			addNotification({ text: error.message, type: 'error', timeout });
		}
	}

	const handlerDeleteAlert = async (alertId, index) => {
		if (window.confirm("Are you sure you want to delete this alert?")) {
			remove({
				params: { alertId },
			})
				.then(data => {
					alert("Alert deleted successfully!");
					window.location.href = "/alerts";
				})
				.catch(error => {
					addNotification({ text: error.message, type: 'error', timeout });
				})
		}
	};

	React.useEffect(() => {
		get({
			params: { alertId }
		})
			.then(alert => {
				alert = alert[0]
				const since = DateTime.fromISO(alert.since).toFormat('yyyy-MM-dd');
				console.log("🚀 ~ file: index.jsx ~ line 65 ~ React.useEffect ~ since", since)
				const until = DateTime.fromISO(alert.until).toFormat('yyyy-MM-dd');
				setSince(since);
				setUntil(until);
				setMessage(alert.message);
				setStatus(alert.status);
			})
			.catch(err => {
				addNotification({ text: "Something went wrong while loading alert information", type: 'error', timeout });
			})
	}, [])

	return (
		<div>
			<div className="py-4">
				<h1 className="text-2xl text-white font-bold">Modify Alert</h1>
			</div>
			<React.Fragment>
				<div className="flex flex-wrap -mx-3 mb-3">
					<Input type="date" value={since} setValue={setSince} label="Since" />
					<Input type="date" value={until} setValue={setUntil} label="Until" />
					<Input type="text" value={message} setValue={setMessage} label="Message" />
					<Dropdown label="Status" options={statusOptions} value={status} setValue={setStatus} />
				</div>
				<div className="w-full flex">
					<div className="mr-2">
						<Button type="success" text="Modify" onClick={saveAlert} />
					</div>
					<div className="mr-2">
						<Button text="Delete" onClick={() => handlerDeleteAlert(alertId)} />
					</div>
				</div>
			</React.Fragment>
		</div>
	);
}
