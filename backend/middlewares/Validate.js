const rules = require('./rules');

module.exports = (ruleType) =>
	function(req, res, next) {
		const keys = Object.keys(rules[ruleType]);
		if (keys.length === 0) {
			return next();
		}
		for (const key of keys) {
			const rule = rules[ruleType][key];
			const value = req.body[key];
			if (rule.required && !value) {
				return res.status(400).json({
					message: `${key} is required`
				});
			}
			if (rule.type && typeof value !== rule.type) {
				return res.status(400).json({
					message: `${key} must be ${rule.type}`
				});
			}
			if (rule.min && value <= rule.min) {
				return res.status(400).json({
					message: `${key} must be greater than ${rule.min}`
				});
			}
			if (rule.max && value > rule.max) {
				return res.status(400).json({
					message: `${key} must be less than ${rule.max}`
				});
			}
			if (rule.minLength && value.length < rule.minLength) {
				return res.status(400).json({
					message: `${key} must be at least ${rule.minLength} characters long`
				});
			}
			if (rule.maxLength && value.length > rule.maxLength) {
				return res.status(400).json({
					message: `${key} must be less than ${rule.maxLength} characters long`
				});
			}
		}
		next();
	};
