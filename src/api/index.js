const router = require('express').Router(),
  ADMIN = require('./routes/admin');

CUSTOMER = require('./routes/customer');

router.use('/customer', CUSTOMER);
router.use('/admin', ADMIN);

module.exports = router;
