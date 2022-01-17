const Contact = require('../models/Contacts');
const { Router } = require('express');
const router = Router();
const Validate = require('../middlewares/Validate');
const { v4: uuid } = require('uuid');

router.get('/:contactId?', async (req, res) => {
	const { contactId } = req.params;
	const filter = {};
	if (contactId) filter._id = contactId;
	const contacts = await Contact.find(filter);
	return res.json(contacts);
});

router.post('/', Validate('contact'), async (req, res) => {
	try {
		const contact = new Contact({
			id: uuid(),
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			zip: req.body.zip,
			country: req.body.country
		});
		await contact.save();
		return res.json({
			message: 'Client added successfully',
			uuid: contact.id
		});
	} catch (e) {
		console.log('Error saving client:', e);
		return res.status(400).json({
			message: 'Error saving client'
		});
	}
});

module.exports = router;
