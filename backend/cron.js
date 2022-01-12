const cron = require('node-cron');

module.exports = (Alerts) => {
	cron.schedule('* * * * *', async function() {
		const alerts = await Alerts.find();
		console.log(alerts);
	});
};
