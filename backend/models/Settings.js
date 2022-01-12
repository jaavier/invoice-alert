const mongoose = require('mongoose');

const SchemaSettings = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	maxAttempts: {
		type: Number,
		default: 3
	}
});

module.exports = mongoose.model('Settings', SchemaSettings);
