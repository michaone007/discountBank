const router = require('express').Router();
const JsonWebToken = require('../../services/JsonWebToken');
const looger = require('../../loaders/looger');
const validateJwt = require('../../middleware/validateJwt');

router.get('/generatejwt', async (req, res) => {
  const jsonWebToken = new JsonWebToken({ bank: 'discount' });
  const jwt = jsonWebToken.createJwt();

  return res.send(jwt.toString());
});

router.get('/', validateJwt, async (req, res) => {
  return res.json({ status: 'valid' });
});

module.exports = router;
