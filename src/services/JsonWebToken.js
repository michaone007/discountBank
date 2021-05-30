/* eslint-disable no-undef */
const jwt = require('jsonwebtoken'),
  path = require('path'),
  fs = require('fs'),
  privateKey = fs.readFileSync(path.join(__dirname, '../', 'certs', 'private.key'), 'utf8'),
  cert = fs.readFileSync(path.join(__dirname, '../', 'certs', 'public.pem'), 'utf8'); // get public key

module.exports = class JsonWebToken {
  constructor(obj) {
    this.obj = obj;
  }

  createJwt() {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60, data: this.obj }, privateKey, {
      algorithm: 'RS256',
    });
    return token;
  }

  verifyJwt() {
    const response = jwt.verify(this.obj, cert);

    return response;
  }
};
