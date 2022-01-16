import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { InvoicesProvider } from './contexts/invoices';
import { CreateAlertProvider } from './contexts/createAlert';
import { NotificationProvider } from './contexts/useNotification';
import { render } from 'react-dom';

render(
	<React.StrictMode>
		<InvoicesProvider>
			<CreateAlertProvider>
				<NotificationProvider>
					<App />
				</NotificationProvider>
			</CreateAlertProvider>
		</InvoicesProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
