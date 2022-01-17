const { Router } = require('express');
const router = Router();
const Alert = require('../models/Alert');
const Invoice = require('../models/Invoice');
const Validate = require('../middlewares/Validate');
const { v4: uuid } = require('uuid');
const cron = require('../cron');
cron(Alert);

router.get('/', async (req, res) => {
	const { limit = 100 } = req.query;
	const filter = {};
	if (req.query.status) filter.status = req.query.status;
	const alerts = await Alert.find(filter).limit(limit).sort({ createdAt: -1 });
	let output = [];
	for (const alert of alerts) {
		const invoice = await Invoice.findOne({ id: alert.invoiceId });
		output.push({
			...alert._doc,
			sheetNumber: invoice.sheetNumber
		});
	}
	return res.json(output);
});

router.get('/:id?/:status?/:limit?', async (req, res) => {
	const { id, status, limit = 100 } = req.params;
	const filter = {};
	if (id && id !== 'all') filter.id = id;
	if (status && status !== 'all') filter.status = status;
	const alerts = await Alert.find(filter).limit(limit).sort({ createdAt: -1 });
	if (alerts.length === 0) {
		return res.status(404).json([]);
	}
	if (alerts.length === 1) return res.json(alerts);
	let output = [];
	for (const alert of alerts) {
		const invoice = await Invoice.findOne({ id: alert.invoiceId });
		output.push({
			...alert._doc,
			sheetNumber: invoice.sheetNumber
		});
	}
	return res.json(output);
});

router.post('/', Validate('alert'), async (req, res) => {
	const alert = new Alert({
		id: uuid(),
		invoiceId: req.body.invoiceId,
		since: req.body.since,
		until: req.body.until,
		message: req.body.message,
		password: uuid(),
		status: 'pending'
	});
	await alert.save();
	return res.json({
		message: 'Alert added successfully',
		uuid: alert.id
	});
});

router.put('/:alertId', async (req, res) => {
	try {
		const alert = await Alert.findOne({ id: req.params.alertId });
		if (!alert) return res.json({ message: 'Alert not found' });
		const { since, until, message, status } = req.body;
		alert.status = status;
		alert.since = since;
		alert.until = until;
		alert.message = message;
		await alert.save();
		return res.json({ message: 'Alert updated successfully' });
	} catch (err) {
		return res.status(400).json({ message: 'Error updating alert' });
	}
});

router.post('/unlock/:alertId', async (req, res) => {
	const { alertId } = req.params;
	const { password } = req.body;
	const alert = await Alert.findOne({ id: alertId });
	if (!alert) return res.status(404).json({ message: 'Alert not found' });
	if (alert && alert.attempts > 0)
		return res.status(400).json({ error: 'Unlock failed. Please contact admin@payme.com' });
	if (alert && !alert.readed && alert.password === password) {
		// alert.readed = true;
		// await alert.save();
		const invoice = await Invoice.findOne({ id: alert.invoiceId });
		return res.json({ alert, invoice });
	} else if (alert && alert.password !== password) {
		alert.attempts = alert.attempts + 1;
		await alert.save();
		return res.status(404).json({ message: 'Alert not found' });
	}
});

router.delete('/:alertId', async (req, res) => {
	const alert = await Alert.findOne({ id: req.params.alertId });
	if (!alert) return res.status(404).json({ message: 'Alert not found' });
	await Alert.deleteOne({ id: req.params.alertId });
	return res.json({ message: 'Alert deleted successfully' });
});

module.exports = router;
