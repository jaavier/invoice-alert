const nodemailer = require('nodemailer');
module.exports = () => {
	const transporter = nodemailer.createTransport({
		host: 'gmail',
		port: 'gmail',
		auth: {
			user: '',
			pass: ''
		}
	});
	transporter.verify((error, success) => {
		if (error) {
			console.log(error);
		}
		else {
			console.log('Server is ready to send messages');
		}
	});
};
