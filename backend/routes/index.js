const alerts = require('./alerts');
const invoices = require('./invoices');
const contacts = require('./contacts');
const { Router } = require('express');
const router = Router();

router.use('/alerts', alerts);
router.use('/invoices', invoices);
router.use('/contacts', contacts);

module.exports = router;
