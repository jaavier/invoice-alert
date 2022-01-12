const mongoose = require('mongoose');
const AlertSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	invoiceId: {
		type: String,
		required: true
	},
	since: {
		type: Date,
		required: true
	},
	until: {
		type: Date,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	readed: {
		type: Boolean,
		default: false,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	answer: {
		type: String,
		required: false
	},
	attempts: {
		type: Number,
		default: 0
	},
	status: {
		type: String,
		default: 'pending',
		required: true
	}
});
module.exports = mongoose.model('Alert', AlertSchema);
