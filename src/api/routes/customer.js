const router = require('express').Router();
const Customer = require('../../services/Customer');
const looger = require('../../loaders/looger');
const { createCustomerValidation, updateCustomerValidation } = require('../../middleware/customerValidation');
const validateJwt = require('../../middleware/validateJwt');

router.post('/', validateJwt, createCustomerValidation, async (req, res, next) => {
  const { body } = req;
  const customer = new Customer(body);
  const result = await customer.create();
  res.json(result);
});

router.get('/:customerId', validateJwt, async (req, res) => {
  const { customerId } = req.params;
  const customer = await Customer.getOne(customerId);
  if (customer == null) {
    return res.status(404).json({ status: 'customer not found' });
  }
  return res.json(customer);
});

router.delete('/:customerId', validateJwt, async (req, res) => {
  const { customerId } = req.params;
  const deleted = await Customer.delete(customerId);

  if (deleted == 0) {
    return res.status(404).json({ status: 'customer not found' });
  }

  return res.json({ status: 'deleted' });
});

router.get('/', validateJwt, async (req, res) => {
  const customer = await Customer.getAll();
  return res.json(customer);
});

router.put('/', validateJwt, updateCustomerValidation, async (req, res) => {
  const { body } = req;

  const result = await Customer.update(body);

  if (!result) {
    return res.status(404).json({ status: 'cant find permissions or customer to update' });
  }
  return res.json({ status: 'updated' });
});

module.exports = router;
