const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String
	},
	address: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	zip: {
		type: String
	},
	country: {
		type: String,
		required: true
	},
	metadata: {
		type: Object
	}
});

module.exports = mongoose.model('Contact', ContactSchema);
