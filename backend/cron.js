const cron = require('node-cron');

module.exports = (Alerts) => {
	cron.schedule('* * * * *', async function() {
		const alerts = await Alerts.find({
			status: 'pending',
			until: {
				$gte: new Date()
			},
			since: {
				$lte: new Date()
			}
		});
		console.log(`${alerts.length} alerts to send`);
	});
};
