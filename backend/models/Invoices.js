const mongoose = require('mongoose');
const statusList = require('../constants/invoices/statusList');

const InvoiceSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	sheetNumber: {
		type: Number,
		required: true,
		unique: true
	},
	receiver: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	issueDate: {
		type: Date,
		required: true
	},
	dueDate: {
		type: Date,
		required: true
	},
	metadata: {
		type: Object
	},
	clientId: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true,
		enum: statusList
	}
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
