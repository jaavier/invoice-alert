import { useState } from 'react';

function validateNotificationType(type) {
	const notificationTypes = [ 'info', 'success', 'warning', 'error' ];
	return notificationTypes.includes(type) ? type : 'info';
}
export default function useNotification({ text: _text, type: _type, autoClose: _autoClose = 5, hide: _hide }) {
	const [ text, setText ] = useState(_text);
	const [ type, setType ] = useState(validateNotificationType(_type));
	const [ hide, setHide ] = useState(true);
	const [ autoClose, setAutoClose ] = useState(_autoClose);
	const update = ({ text, type, hide, autoClose }) => {
		if (text) setText(text);
		if (type) setType(validateNotificationType(type));
		if (typeof autoClose === typeof 'boolean' || typeof autoClose === 'number') {
			setAutoClose(autoClose);
		}
		setHide(hide);
	};
	return {
		text,
		type,
		hide,
		autoClose,
		update
	};
}
