module.exports = {
	receiver: {
		type: 'string',
		minLength: 10,
		required: true
	},
	sheetNumber: {
		type: 'number',
		min: 1,
		required: true
	},
	amount: {
		type: 'number',
		min: 1,
		required: true
	},
	issueDate: {
		type: 'string',
		required: true
	},
	dueDate: {
		type: 'string',
		required: true
	}
};
