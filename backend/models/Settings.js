const mongoose = require('mongoose');

const SchemaSettings = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('Settings', SchemaSettings);
