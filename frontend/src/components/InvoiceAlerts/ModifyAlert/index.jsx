import React from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import loadAlerts from '../../../helpers/requests/loadAlerts';
import modifyAlert from '../../../helpers/requests/modifyAlert';
import Dropdown from '../../Forms/Dropdown';
import deleteAlert from '../../../helpers/requests/deleteAlert';
import Notification from '../../../helpers/Notification';
import useNotification from '../../../hooks/useNotification';
import alertStatuses from '../../../hooks/useAlerts/alertStatuses';
import useApi from '../../../hooks/useApi';

export default function ModifyAlert() {
	const notification = useNotification({});
	const { alertId } = useParams();
	const [since, setSince] = React.useState("");
	const [until, setUntil] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [status, setStatus] = React.useState("");
	const statusOptions = alertStatuses
		.filter(({ text }) => text !== 'All')
		.map(({ status: value, text: label }) => ({ value, label }))
	const { put, response: alert } = useApi('alerts');

	const saveAlert = async () => {
		if (!since || !until || !message) {
			notification.update({ text: "Please fill in all fields", type: "error" });
			return;
		}
		try {
			put(alertId, {
				since,
				until,
				message,
				status,
			})
			notification.update({ text: 'Alert modified successfully!', type: 'success' });

		} catch (error) {
			console.log(error);
			notification.update({ text: "Something went wrong", type: 'error' });
		}
	}
	// const saveAlert = async () => {
	// 	try {
	// 		await modifyAlert({
	// 			alertId, since, until, message, status
	// 		});
	// 		notification.update({ text: 'Alert modified successfully!', type: 'success' });
	// 	} catch (error) {
	// 		console.log(error);
	// 		notification.update({ text: "Something went wrong", type: 'error' });
	// 	}
	// }

	const handlerDeleteAlert = async (alertId, index) => {
		if (window.confirm("Are you sure you want to delete this alert?")) {
			deleteAlert(alertId)
				.then(data => {
					alert("Alert deleted successfully!");
					window.location.href = "/alerts";
				})
				.catch(error => {
					notification.update({ text: error.message, type: 'error' });
				})
		}
	};

	React.useEffect(() => {
		loadAlerts(alertId)
			.then(alert => {
				console.log("🚀 ~ file: index.jsx ~ line 71 ~ React.useEffect ~ alert", alert)
				const since = DateTime.fromISO(alert.since).toFormat('yyyy-MM-dd');
				const until = DateTime.fromISO(alert.until).toFormat('yyyy-MM-dd');
				setSince(since);
				setUntil(until);
				setMessage(alert.message);
				setStatus(alert.status);
			})
			.catch(err => {
				notification.update({ text: "Something went wrong while loading alert information", type: 'error' });
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
				<div className="w-full mt-5">
					<Notification notification={notification} />
				</div>
			</React.Fragment>
		</div>
	);
}
