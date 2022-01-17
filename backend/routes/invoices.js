const { v4: uuid } = require('uuid');
const express = require('express');
const Invoice = require('../models/Invoice');
const router = express.Router();
const Validate = require('../middlewares/Validate');
const statusList = require('../constants/invoices/statusList');

router.get('/', async (req, res) => {
	const filter = {};
	const { status } = req.query;
	const limit = req.query.limit ? parseInt(req.query.limit) : 100;
	if (statusList.indexOf(status) !== -1) filter.status = status;
	const invoices = await Invoice.find(filter).limit(limit);
	return res.json(invoices);
});

router.get('/:id?/:status?/:limit?', async (req, res) => {
	const filter = req.params;
	const keys = Object.keys(filter);
	const limit = req.params.limit ? parseInt(req.params.limit) : 100;
	const bannedWords = [ 'limit' ];
	const checkKey = (key) => {
		if (bannedWords.indexOf(key) !== -1) return true;
		if (!filter[key]) return true;
		if (filter[key] === 'all') return true;
		return false;
	};
	keys.forEach((key) => {
		if (checkKey(key)) delete filter[key];
	});
	const invoice = await Invoice.find(filter).limit(limit);
	if (invoice) return res.json(invoice);
	else return res.json({ message: 'Invoice not found' });
});

router.post('/', Validate('invoice'), async (req, res) => {
	try {
		//
		const invoice = new Invoice({
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
	await Invoice.updateOne({ id: req.params.id }, req.body);
	return res.json({
		message: 'Invoice updated successfully'
	});
});

module.exports = router;
