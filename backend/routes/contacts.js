const Contact = require('../models/Contacts');
const { Router } = require('express');
const router = Router();

router.get('/:contactId?', (req, res) => {
	const { contactId } = req.params;
	const filter = {};
	if (contactId) filter._id = contactId;
	const contacts = Contact.find(filter);
	return res.json(contacts);
});

router.post('/', async (req, res) => {
	try {
		const contact = new Contact({
			id: uuid(),
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			zip: req.body.zip
		});
		await contact.save();
		return res.json({
			message: 'Client added successfully',
			uuid: contact.id
		});
	} catch (e) {
		console.log('Error saving client:', e);
		return res.json({
			message: 'Error saving client'
		});
	}
});

module.exports = router;
