module.exports = {
	invoiceId: {
		type: 'string',
		required: true,
		minLength: 12
	},
	since: {
		type: 'string',
		required: true
	},
	until: {
		type: 'string',
		required: true
	},
	message: {
		type: 'string',
		required: true,
		maxLength: 140
	}
};
