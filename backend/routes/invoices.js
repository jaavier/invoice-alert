const { v4: uuid } = require('uuid');
const express = require('express');
const Invoices = require('../models/Invoices');
const router = express.Router();
const Validate = require('../middlewares/Validate');
const statusList = require('../constants/invoices/statusList');

router.get('/', async (req, res) => {
	const filter = {};
	const { status } = req.query;
	const limit = req.query.limit ? parseInt(req.query.limit) : 100;
	if (statusList.indexOf(status) !== -1) filter.status = status;
	const invoices = await Invoices.find(filter).limit(limit);
	return res.json(invoices);
});

router.get('/:id?/:status?/:limit?', async (req, res) => {
	const filter = req.params;
	const keys = Object.keys(filter);
	keys.forEach((key) => {
		if (!filter[key]) delete filter[key];
	});
	const invoice = await Invoices.findOne(filter);
	if (invoice) return res.json(invoice[property] ? { property: invoice[property] } : invoice);
	else return res.json({ message: 'Invoice not found' });
});

router.post('/', Validate('invoice'), async (req, res) => {
	try {
		//
		const invoice = new Invoices({
			id: uuid(),
			sheetNumber: req.body.sheetNumber,
			receiver: req.body.receiver,
			amount: req.body.amount,
			issueDate: req.body.issueDate,
			dueDate: req.body.dueDate,
			clientId: 'get from session user',
			status: 'pending'
		});
		await invoice.save();
		return res.json({
			message: 'Invoice added successfully',
			uuid: invoice.id
		});
	} catch (e) {
		console.log('Error saving invoice:', e);
		return res.json({
			message: 'Error saving invoice'
		});
	}
});

router.put('/:id', Validate('invoice'), async (req, res) => {
	await Invoices.updateOne({ id: req.params.id }, req.body);
	return res.json({
		message: 'Invoice updated successfully'
	});
});

module.exports = router;
