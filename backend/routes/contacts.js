const Contact = require('../models/Contact');
const Invoice = require('../models/Invoice');
const { Router } = require('express');
const router = Router();
const Validate = require('../middlewares/Validate');
const { v4: uuid } = require('uuid');

router.get('/:contactId?/:section?', async (req, res) => {
	const { contactId, section } = req.params;
	const filter = {};
	if (contactId) filter.id = contactId;
	if (section === 'invoices') {
		const alerts = await Invoice.find({ contact: contactId });
	}
	const contacts = await Contact.find(filter);
	if (contacts.length === 0) return res.status(404).json({ message: 'Contact not found' });
	res.json(contacts);
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

router.delete('/:contactId', async (req, res) => {
	const { contactId } = req.params;
	try {
		const contact = await Contact.findOneAndDelete({ id: contactId });
		if (!contact) {
			return res.status(404).json({
				message: 'Client not found'
			});
		}
		return res.json({
			message: 'Client deleted successfully'
		});
	} catch (e) {
		console.log('Error deleting client:', e);
		return res.status(400).json({
			message: 'Error deleting client'
		});
	}
});

router.put('/:contactId', async (req, res) => {
	const contact = await Contact.findOne({ id: req.params.contactId });
	if (!contact) return res.status(404).json({ message: 'Contact not found' });
	const { name, email, phone, address, city, state, zip, country } = req.body;
	if (name) contact.name = name;
	if (email) contact.email = email;
	if (phone) contact.phone = phone;
	if (address) contact.address = address;
	if (city) contact.city = city;
	if (state) contact.state = state;
	if (zip) contact.zip = zip;
	if (country) contact.country = country;
	await contact.save();
	return res.json({ message: 'Contact updated successfully' });
});

module.exports = router;
