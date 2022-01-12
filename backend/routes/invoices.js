const { v4: uuid } = require('uuid');
const express = require('express');
const Invoices = require('../models/Invoices');
const router = express.Router();
const Validate = require('../middlewares/Validate');

router.get('/', async (req, res) => {
	// add filter by user in session
	const invoices = await Invoices.find();
	return res.json(invoices);
});

router.get('/:id/:property?', async (req, res) => {
	const { id, property } = req.params;
	const invoice = await Invoices.findOne({ id });
	if (invoice) return res.json(invoice[property] ? { property: invoice[property] } : invoice);
	else return res.json({ message: 'Invoice not found' });
});

router.post('/', Validate('invoice'), async (req, res) => {
	console.log('req.body', req.body);
	try {
		//
		const invoice = new Invoices({
			id: uuid(),
			sheetNumber: req.body.sheetNumber,
			receiver: req.body.receiver,
			amount: req.body.amount,
			issueDate: req.body.issueDate,
			dueDate: req.body.dueDate,
			clientId: 'get from session user'
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
