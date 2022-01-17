module.exports = {
	name: {
		type: 'string',
		minLength: 3,
		required: true
	},
	email: {
		type: 'string',
		min: 5,
		required: true
	},
	country: {
		type: 'string',
		min: 1,
		required: true
	}
};
